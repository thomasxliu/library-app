package com.mmtrios.springbootlibrary.dao;

import com.mmtrios.springbootlibrary.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {

}
