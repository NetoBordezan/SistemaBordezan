package com.exemplo.bordezanbackend.repository;


import com.exemplo.bordezanbackend.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<Supplier,Long> {
}
