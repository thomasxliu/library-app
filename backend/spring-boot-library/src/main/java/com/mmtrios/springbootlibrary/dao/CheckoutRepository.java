package com.mmtrios.springbootlibrary.dao;

import com.mmtrios.springbootlibrary.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {
    Checkout findByEmailAndBookId(String userEmail, Long bookId);
}
