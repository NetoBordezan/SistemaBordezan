package com.exemplo.bordezanbackend.repository;

import com.exemplo.bordezanbackend.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<Ingredient,Long> {
}
