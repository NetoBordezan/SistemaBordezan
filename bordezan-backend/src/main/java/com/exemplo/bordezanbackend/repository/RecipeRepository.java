package com.exemplo.bordezanbackend.repository;

import com.exemplo.bordezanbackend.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe,Long> {
}
