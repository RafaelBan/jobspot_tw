package com.banrafael.moneyplan.repository;

import java.util.Optional;

import com.banrafael.moneyplan.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    Optional<Job> findByUserId(int userId);
    long count();
}