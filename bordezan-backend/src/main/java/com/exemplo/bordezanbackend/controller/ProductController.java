package com.exemplo.bordezanbackend.controller;

import com.exemplo.bordezanbackend.entity.Product;
import com.exemplo.bordezanbackend.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product supplier) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createProduct(supplier));
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(service.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> supplier = service.getProductById(id);

        if (supplier.isPresent()) {
            return ResponseEntity.ok(supplier.get());
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProductById(@PathVariable Long id, @RequestBody Product supplier) {
        Optional<Product> supplierToUpdate = service.getProductById(id);

        if (supplierToUpdate.isPresent()) {
            supplier.setId(id);

            Product updatedProduct = service.updateProduct(supplier);

            return ResponseEntity.ok(updatedProduct);
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductById(@PathVariable Long id) {
        Optional<Product> supplierToDelete = service.getProductById(id);

        if (supplierToDelete.isPresent()) {
            service.deleteById(id);

            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}