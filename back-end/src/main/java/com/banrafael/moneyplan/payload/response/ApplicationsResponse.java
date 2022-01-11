package com.banrafael.moneyplan.payload.response;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class ApplicationsResponse {
    private String id;
    private String title;
    private String description;
    private String applicant;
    private String location;
    private String date;
    private String status;

    public ApplicationsResponse(String id, String title, String description, String applicant, String location, String status, String date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.applicant = applicant;
        this.location = location;
        this.status = status;
        this.date = date;
    }
}

