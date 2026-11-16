package com.exemplo.bordezanbackend.controller;

import com.exemplo.bordezanbackend.entity.Ingredient;
import com.exemplo.bordezanbackend.service.IngredientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ingredients")
@CrossOrigin(origins = "http://localhost:5173")
public class IngredientController {

    private final IngredientService service;

    public IngredientController(IngredientService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Ingredient> createIngredient(@Valid @RequestBody Ingredient ingredient) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createIngredient(ingredient));
    }

    @GetMapping
    public ResponseEntity<List<Ingredient>> getAllIngredients() {
        return ResponseEntity.ok(service.getAllIngredients());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ingredient> getIngredientById(@PathVariable Long id) {
        Optional<Ingredient> ingredient = service.getIngredientById(id);

        if (ingredient.isPresent()) {
            return ResponseEntity.ok(ingredient.get());
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ingredient> updateIngredientById(@PathVariable Long id, @Valid @RequestBody Ingredient ingredient) {
        Optional<Ingredient> ingredientToUpdate = service.getIngredientById(id);

        if (ingredientToUpdate.isPresent()) {
            ingredient.setId(id);
            return ResponseEntity.ok(service.updateIngredient(id,ingredient));
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIngredientById(@PathVariable Long id) {
        Optional<Ingredient> ingredientToDelete = service.getIngredientById(id);

        if (ingredientToDelete.isPresent()) {
            service.deleteById(id);

            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}