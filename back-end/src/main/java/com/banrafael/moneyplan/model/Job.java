package com.banrafael.moneyplan.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;


@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "jobs", schema="public")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotBlank
    @Column(name = "user_id")
    private int userId;

    @NotBlank
    @Size(min=4, max = 100)
    @Column(name = "title")
    private String title;

    @NotBlank
    @Size(min=0, max = 500)
    @Column(name = "description")
    private String description;

    @NotBlank
    @Size(min=0, max = 150)
    @Column(name = "tags")
    private String tags;

    @NotBlank
    @Size(min=0, max = 150)
    @Column(name = "location")
    private String location;

    @NotBlank
    @Size(min=4, max = 50)
    @Column(name = "status")
    private String status;
}
