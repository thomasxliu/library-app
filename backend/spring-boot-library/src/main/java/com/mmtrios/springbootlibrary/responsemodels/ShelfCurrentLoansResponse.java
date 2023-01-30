package com.mmtrios.springbootlibrary.responsemodels;

import com.mmtrios.springbootlibrary.entity.Book;
import lombok.Data;

@Data
public class ShelfCurrentLoansResponse {
    private Book book;
    private int daysLeft;

    public ShelfCurrentLoansResponse(Book book, int daysLeft){
        this.book = book;
        this.daysLeft = daysLeft;
    }
}
