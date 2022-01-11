package com.banrafael.moneyplan.payload.response;

import com.banrafael.moneyplan.model.Application;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor

public class JobResponse {
    private String id;
    private String title;
    private String description;
    private String tags;
    private String location;
    private String status;
    private List<JobDetailsResponse> applications;

    public JobResponse(String id, String title, String description, String tags, String location, String status, List<JobDetailsResponse> applications) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.tags = tags;
        this.location = location;
        this.status = status;
        this.applications = applications;
    }
}
