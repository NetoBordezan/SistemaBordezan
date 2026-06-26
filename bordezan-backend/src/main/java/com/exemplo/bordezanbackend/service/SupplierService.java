package com.exemplo.bordezanbackend.service;

import com.exemplo.bordezanbackend.entity.Supplier;
import com.exemplo.bordezanbackend.repository.SupplierRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupplierService {

    private final SupplierRepository repository;

    public SupplierService(SupplierRepository repository) {
        this.repository = repository;
    }

    public Supplier createSupplier(Supplier supplier) {
        return repository.save(supplier);
    }

    public List<Supplier> getAllSuppliers() {
        return repository.findAll();
    }

    public Optional<Supplier> getSupplierById(Long id) {
        return repository.findById(id);
    }

    public Supplier updateSupplier(Supplier supplier) {
        return repository.save(supplier);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}