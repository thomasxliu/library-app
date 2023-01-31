package com.mmtrios.springbootlibrary.dao;

import com.mmtrios.springbootlibrary.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {

}
