package com.exemplo.bordezanbackend.service;

import com.exemplo.bordezanbackend.entity.Ingredient;
import com.exemplo.bordezanbackend.repository.IngredientRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IngredientService {

    private final IngredientRepository repository;

    public IngredientService(IngredientRepository repository) {
        this.repository = repository;
    }

    public Ingredient createIngredient(Ingredient supplier) {
        return repository.save(supplier);
    }

    public List<Ingredient> getAllIngredients() {
        return repository.findAll();
    }

    public Optional<Ingredient> getIngredientById(Long id) {
        return repository.findById(id);
    }

    public Ingredient updateIngredient(Long id, Ingredient recipe) {
        Ingredient existingIngredient = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Matéria-Prima não encontrada"));

        existingIngredient.setName(recipe.getName());
        existingIngredient.setUnitOfMeasure(recipe.getUnitOfMeasure());
        existingIngredient.setMinimumQuantity(recipe.getMinimumQuantity());
        existingIngredient.setCost(recipe.getCost());
        existingIngredient.setActive(recipe.getActive());

        return repository.save(existingIngredient);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
