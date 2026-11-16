package com.exemplo.bordezanbackend.service;

import com.exemplo.bordezanbackend.entity.Recipe;
import com.exemplo.bordezanbackend.repository.RecipeRepository;
import org.springframework.stereotype.Service;
import com.exemplo.bordezanbackend.entity.Ingredient;
import com.exemplo.bordezanbackend.repository.IngredientRepository;
import com.exemplo.bordezanbackend.entity.RecipeIngredient;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;

import java.util.ArrayList;
import java.util.List;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {

    private final RecipeRepository repository;
    private final IngredientRepository ingredientRepository;

    public RecipeService(RecipeRepository repository, IngredientRepository ingredientRepository) {
        this.repository = repository;
        this.ingredientRepository = ingredientRepository;
    }

    @Transactional
    public Recipe createRecipe(Recipe recipe) {

        recipe.setRecipeIngredients(
                buildRecipeIngredients(recipe, recipe.getRecipeIngredients())
        );

        return repository.save(recipe);
    }

    public List<Recipe> getAllRecipes() {
        return repository.findAll();
    }

    public Optional<Recipe> getRecipeById(Long id) {
        return repository.findById(id);
    }

    @Transactional
    public Recipe updateRecipe(Long id, Recipe recipe) {

        Recipe existingRecipe = repository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Ficha Técnica não encontrada"
                ));

        existingRecipe.setName(recipe.getName());
        existingRecipe.setYield(recipe.getYield());
        existingRecipe.setUnitOfMeasure(recipe.getUnitOfMeasure());
        existingRecipe.setPreparationMethod(recipe.getPreparationMethod());
        existingRecipe.setPreparationTime(recipe.getPreparationTime());
        existingRecipe.setUnitOfTime(recipe.getUnitOfTime());
        existingRecipe.setActive(recipe.getActive());

        existingRecipe.getRecipeIngredients().clear();

        existingRecipe.getRecipeIngredients().addAll(
                buildRecipeIngredients(
                        existingRecipe,
                        recipe.getRecipeIngredients()
                )
        );

        return repository.save(existingRecipe);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    private List<RecipeIngredient> buildRecipeIngredients(Recipe recipe, List<RecipeIngredient> submittedIngredients) {
        List<RecipeIngredient> associations = new ArrayList<>();

        if (submittedIngredients == null) {
            return associations;
        }

        for (RecipeIngredient item : submittedIngredients) {

            if (item.getIngredient() == null ||
                    item.getIngredient().getId() == null) {
                throw new IllegalArgumentException(
                        "É necessário informar uma matéria-prima válida."
                );
            }

            Long ingredientId = item.getIngredient().getId();

            Ingredient ingredient = ingredientRepository.findById(ingredientId)
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Matéria-prima com ID " + ingredientId + " não encontrada."
                    ));

            RecipeIngredient association = new RecipeIngredient();

            association.setRecipe(recipe);
            association.setIngredient(ingredient);
            association.setQuantity(item.getQuantity());

            associations.add(association);
        }

        return associations;
    }
}
