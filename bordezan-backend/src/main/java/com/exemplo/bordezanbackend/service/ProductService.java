package com.exemplo.bordezanbackend.service;

import com.exemplo.bordezanbackend.entity.Product;
import com.exemplo.bordezanbackend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public Product createProduct(Product supplier) {
        return repository.save(supplier);
    }

    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return repository.findById(id);
    }

    public Product updateProduct(Product supplier) {
        return repository.save(supplier);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}