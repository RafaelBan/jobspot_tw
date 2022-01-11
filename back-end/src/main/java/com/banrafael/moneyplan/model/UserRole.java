package com.banrafael.moneyplan.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "user_roles")
public class UserRole {
    @Id
    @Column(name = "user_id")
    private Integer user_id;

    @Column(name = "role_id")
    private Integer role_id;
}
