package com.banrafael.moneyplan.controllers;

import com.banrafael.moneyplan.model.Application;
import com.banrafael.moneyplan.model.Job;
import com.banrafael.moneyplan.model.User;
import com.banrafael.moneyplan.payload.request.*;
import com.banrafael.moneyplan.payload.response.*;
import com.banrafael.moneyplan.repository.ApplicationRepository;
import com.banrafael.moneyplan.repository.JobRepository;
import com.banrafael.moneyplan.repository.UserRepository;
import com.banrafael.moneyplan.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/func")
public class MainController {
  @Autowired
  UserRoleRepository userRoleRepository;

  @Autowired
  JobRepository jobRepository;

  @Autowired
  UserRepository userRepository;

  @Autowired
  ApplicationRepository applicationRepository;

  @PostMapping("/user")
  public ResponseEntity<?> userDetails(@RequestParam("username") String username) {
    User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("Error: User not found."));
    return ResponseEntity.ok(new UserResponse(
            user.getEmail(),
            user.getFirstName(),
            user.getLastName()));
  }

  @PostMapping("/user/update")
  public ResponseEntity<?> updateUserDetails(@Valid @RequestBody UserRequest userRequest) {
    User user = userRepository.findByUsername(userRequest.getUsername()).orElseThrow(() -> new RuntimeException("Error: User not found."));
    user.setEmail(userRequest.getEmail());
    user.setFirstName(userRequest.getFirstName());
    user.setLastName(userRequest.getLastName());
    userRepository.save(user);
    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }

  @PostMapping("/home")
  public ResponseEntity<?> homeInformation(@Valid @RequestBody HomeRequest homeRequest) {
    long jobCount = jobRepository.count();
    long userCount = userRoleRepository.countAllByRoleId(1);
    long recruiterCount = userRoleRepository.countAllByRoleId(2);
    User user = userRepository.findByUsername(homeRequest.getUsername()).orElseThrow(() -> new RuntimeException("Error: User not found."));
    List<Application> userApplications = applicationRepository.findByUserId(user.getId().intValue());
    List<ApplicationsResponse> applicationsResponseList = new ArrayList<>();
    for(Application application : userApplications){
      Job job = jobRepository.getById(Long.valueOf(application.getJobId()));
      applicationsResponseList.add(new ApplicationsResponse(
              String.valueOf(application.getId()),
              job.getTitle(),
              job.getDescription(),
              user.getFirstName() + " " + user.getLastName(),
              job.getLocation(),
              application.getStatus(),
              application.getDate()
      ));
    }
    return ResponseEntity.ok(new HomeResponse(
                    String.valueOf(jobCount),
                    String.valueOf(userCount),
                    String.valueOf(recruiterCount),
                    applicationsResponseList));
  }

  @GetMapping("/jobs")
  public ResponseEntity<?> jobsInformation() {
    List<Job> jobList = jobRepository.findAll();
    return ResponseEntity.ok(jobList);
  }

  @PostMapping("job/update")
  public ResponseEntity<?> updateJob(@Valid @RequestBody JobResponse jobResponse) {
    Job job = jobRepository.findById(Long.valueOf(jobResponse.getId())).orElseThrow(() -> new RuntimeException("Error: Job not found."));
    job.setTitle(jobResponse.getTitle());
    job.setDescription(jobResponse.getDescription());
    job.setLocation(jobResponse.getLocation());
    job.setTags(jobResponse.getTags());
    job.setStatus(jobResponse.getStatus());
    jobRepository.save(job);
    return ResponseEntity.ok("Successful");
  }

  @PostMapping("job/create")
  public ResponseEntity<?> createJob(@Valid @RequestBody JobCreation jobCreation) {
    Job job = new Job();
    User user = userRepository.findByUsername(jobCreation.getUsername()).orElseThrow(() -> new RuntimeException("Error: User not found."));
    job.setUserId(user.getId().intValue());
    job.setTitle(jobCreation.getTitle());
    job.setDescription(jobCreation.getDescription());
    job.setLocation(jobCreation.getLocation());
    job.setTags(jobCreation.getTags());
    job.setStatus(jobCreation.getStatus());
    jobRepository.save(job);
    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }

  @PostMapping("job/delete")
  public ResponseEntity<?> deleteJob(@RequestParam("job_id") String job_id) {
    Job job = jobRepository.findById(Long.valueOf(job_id)).orElseThrow(() -> new RuntimeException("Error: Job not found."));
    jobRepository.delete(job);
    return ResponseEntity.ok(new MessageResponse("Job deleted successfully!"));
  }

  @PostMapping("/recruiter/jobs")
  public ResponseEntity<?> recruiterJobs(@RequestParam("recruiter_username") String recruiter_username) {
    User user = userRepository.findByUsername(recruiter_username).orElseThrow(() -> new RuntimeException("Error: User not found."));
    List<Job> jobList = jobRepository.findAllByUserId(Integer.parseInt(String.valueOf(user.getId())));
    return ResponseEntity.ok(jobList);
  }

  @PostMapping("/recruiter/job/details")
  public ResponseEntity<?> recruiterJobDetails(@RequestParam("job_id") String job_id) {
    Job job = jobRepository.findById(Long.parseLong(job_id)).orElseThrow(() -> new RuntimeException("Error: Job not found."));
    List<Application> applicationsList = applicationRepository.findByJobId(job.getId().intValue());
    List<JobDetailsResponse> applications = new ArrayList<>();
    for(Application application : applicationsList) {
      User user = userRepository.findById(Long.valueOf(application.getUserId())).orElseThrow(() -> new RuntimeException("Error: User not found."));
      applications.add(new JobDetailsResponse(
              String.valueOf(application.getId()),
              String.valueOf(user.getId()),
              user.getFirstName() + " " + user.getLastName(),
              user.getEmail(),
              application.getCv_path(),
              application.getStatus()
      ));
    }
    return ResponseEntity.ok(new JobResponse(
            String.valueOf(job.getId()),
            job.getTitle(),
            job.getDescription(),
            job.getTags(),
            job.getLocation(),
            job.getStatus(),
            applications
    ));
  }

  @PostMapping("/application/modify")
  public ResponseEntity<?> modifyApplication(@RequestParam("application_id") String application_id, @RequestParam("status") String status) {
    Application application = applicationRepository.findById(Long.parseLong(application_id)).orElseThrow(() -> new RuntimeException("Error: Application not found."));
    application.setStatus(status);
    applicationRepository.save(application);
    return ResponseEntity.ok("Successful");
  }

  @PostMapping("/application/create")
  public ResponseEntity<?> applicationInformation(@Valid @RequestBody ApplicationInformationRequest applicationInformationRequest) {
    if (!jobRepository.existsById(Long.parseLong(applicationInformationRequest.getJob_id()))) {
      return ResponseEntity.badRequest().body("Oops, the given job id doesn't reach to any job!");
    }
    Job job = jobRepository.findById(Long.parseLong(applicationInformationRequest.getJob_id())).orElseThrow(() -> new RuntimeException("Error: Job not found."));
    User user = userRepository.findByUsername(applicationInformationRequest.getUsername()).orElseThrow(() -> new RuntimeException("Error: Username not found."));
    if(applicationRepository.existsByJobIdAndUserId(Integer.parseInt(applicationInformationRequest.getJob_id()), user.getId().intValue())) {
      return ResponseEntity.badRequest().body("You already applied for this job!");
    }
    if(job.getUserId() == user.getId()) {
      return ResponseEntity.badRequest().body("You can't apply to your own job!");
    }

    return ResponseEntity.ok(new ApplicationInformationResponse(
            String.valueOf(user.getId()),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            job.getTitle(),
            job.getLocation(),
            job.getDescription()));
  }

  @PostMapping("/apply")
  public ResponseEntity<?> application(@Valid @RequestParam("file") MultipartFile file, @RequestParam("job_id") String job_id, @RequestParam("user_id") String user_id) throws IOException {
    User user = userRepository.findById(Long.parseLong(user_id)).orElseThrow(() -> new RuntimeException("Error: User id not found."));
    Application application = new Application(Integer.parseInt(user_id), Integer.parseInt(job_id));
    applicationRepository.save(application);
    String cv_path = "C:/Users/banra/Documents/facultate/tehnologii_web/proiect/cv_directory/" + application.getId() + ".pdf";
    application.setCv_path(cv_path);
    file.transferTo(new File(cv_path));
    applicationRepository.save(application);
    return ResponseEntity.ok("Successful");
  }

  @PostMapping("/application/delete")
  public ResponseEntity<?> applicationDelete(@Valid @RequestParam("application_id") String application_id) {
    Application application = applicationRepository.findById(Long.parseLong(application_id)).orElseThrow(() -> new RuntimeException("Error: Application not found."));
    File cvFile = new File(application.getCv_path());
    cvFile.delete();
    applicationRepository.delete(application);
    return ResponseEntity.ok("Application deleted successfully!");
  }
}
