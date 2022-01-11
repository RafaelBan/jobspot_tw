package com.banrafael.moneyplan.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.Date;


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
    @Column(name = "user_id")
    private int userId;

    @NotBlank
    @Column(name = "job_id")
    private int jobId;

    @NotBlank
    @Column(name = "status")
    private String status;

    @NotBlank
    @Column(name = "cv_path")
    private String cv_path;

    @NotBlank
    @Column(name = "date")
    private String date;

    public Application(int userId, int jobId) {
        this.userId = userId;
        this.jobId = jobId;
        this.status = "Open";
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Date date = new Date();
        this.date = formatter.format(date);
    }

}
