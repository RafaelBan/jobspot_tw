package com.banrafael.moneyplan.model;


import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import org.hibernate.annotations.NaturalId;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "users", schema="public")
public class User{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotBlank
    @Size(min=3, max = 50)
    @Column(name = "username")
    private String username;

    @NotBlank
    @Size(min=3, max = 50)
    @Column(name = "type")
    private String type;

    @NaturalId
    @NotBlank
    @Size(max = 50)
    @Email
    @Column(name = "email")
    private String email;

    @NotBlank
    @Size(min=6, max = 100)
    @Column(name = "password")
    private String password;

    @Size(max = 70)
    @Column(name = "first_name")
    private String firstName;

    @Size(max = 20)
    @Column(name = "last_name")
    private String lastName;


    public User(String username, String email, String password, String firstName, String lastName, String type) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.type = type;
    }
}