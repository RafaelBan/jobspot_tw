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
@Table(name = "applications", schema="public")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotBlank
    @Column(name = "userId")
    private int userId;

    @NotBlank
    @Column(name = "jobId")
    private int jobId;

    @NotBlank
    @Size(min=4, max = 50)
    @Column(name = "status")
    private String status;

}
