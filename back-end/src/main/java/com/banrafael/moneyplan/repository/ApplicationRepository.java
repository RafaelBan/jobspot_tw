package com.banrafael.moneyplan.repository;

import java.util.Optional;

import com.banrafael.moneyplan.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    Optional<Application> findByUserId(int userId);
    Optional<Application> findByJobId(int jobId);
}