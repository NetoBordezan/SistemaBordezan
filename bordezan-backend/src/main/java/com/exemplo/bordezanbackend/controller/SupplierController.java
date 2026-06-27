package com.exemplo.bordezanbackend.controller;

import com.exemplo.bordezanbackend.entity.Supplier;
import com.exemplo.bordezanbackend.service.SupplierService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/suppliers")
@CrossOrigin(origins = "http://localhost:5173")
public class SupplierController {

    private final SupplierService service;

    public SupplierController(SupplierService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Supplier> createSupplier(@RequestBody Supplier supplier) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createSupplier(supplier));
    }

    @GetMapping
    public ResponseEntity<List<Supplier>> getAllSuppliers() {
        return ResponseEntity.ok(service.getAllSuppliers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Supplier> getSupplierById(@PathVariable Long id) {
        Optional<Supplier> supplier = service.getSupplierById(id);

        if (supplier.isPresent()) {
            return ResponseEntity.ok(supplier.get());
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Supplier> updateSupplierById(@PathVariable Long id, @RequestBody Supplier supplier) {
        Optional<Supplier> supplierToUpdate = service.getSupplierById(id);

        if (supplierToUpdate.isPresent()) {
            supplier.setId(id);

            Supplier updatedSupplier = service.updateSupplier(supplier);

            return ResponseEntity.ok(updatedSupplier);
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSupplierById(@PathVariable Long id) {
        Optional<Supplier> supplierToDelete = service.getSupplierById(id);

        if (supplierToDelete.isPresent()) {
            service.deleteById(id);

            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}