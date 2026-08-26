package com.exemplo.bordezanbackend.repository;


import com.exemplo.bordezanbackend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {
}
