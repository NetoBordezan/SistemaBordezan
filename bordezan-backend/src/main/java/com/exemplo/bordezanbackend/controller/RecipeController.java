package com.exemplo.bordezanbackend.controller;

import com.exemplo.bordezanbackend.entity.Recipe;
import com.exemplo.bordezanbackend.service.RecipeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/recipes")
@CrossOrigin(origins = "http://localhost:5173")
public class RecipeController {

    private final RecipeService service;

    public RecipeController(RecipeService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Recipe> createRecipe(@Valid @RequestBody Recipe recipe) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createRecipe(recipe));
    }

    @GetMapping
    public ResponseEntity<List<Recipe>> getAllRecipes() {
        return ResponseEntity.ok(service.getAllRecipes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) {
        Optional<Recipe> recipe = service.getRecipeById(id);

        if (recipe.isPresent()) {
            return ResponseEntity.ok(recipe.get());
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Recipe> updateRecipeById(@PathVariable Long id, @Valid @RequestBody Recipe recipe) {
        Optional<Recipe> recipeToUpdate = service.getRecipeById(id);

        if (recipeToUpdate.isPresent()) {
            recipe.setId(id);

            Recipe updatedRecipe = service.updateRecipe(id,recipe);

            return ResponseEntity.ok(updatedRecipe);
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipeById(@PathVariable Long id) {
        Optional<Recipe> recipeToDelete = service.getRecipeById(id);

        if (recipeToDelete.isPresent()) {
            service.deleteById(id);

            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}
