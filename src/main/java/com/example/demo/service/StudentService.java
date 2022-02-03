package com.example.demo.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.model.Response;
import com.example.demo.model.Student;
import com.example.demo.repo.StudentRepo;



@Service
public class StudentService {

	
	
	@Autowired
	private StudentRepo studentRepo;
	
	@Autowired
	private MessageSource messageSource;
	
	public ResponseEntity<Response> saveStudent(Student student) {
		ResponseEntity<Response> responseEntity = null;
		try {
			if (student.getId() == null) {
			
			
				studentRepo.save(student);
					
				
					responseEntity = new ResponseEntity<Response>(new Response(true,
							messageSource.getMessage("ADD_STUDENT_SUCCESS", null, LocaleContextHolder.getLocale()), 
							null, null), HttpStatus.OK);
				
			} else {
				
					student.setId(student.getId());
					studentRepo.save(student);
					responseEntity = new ResponseEntity<Response>(new Response(true,
							messageSource.getMessage("UPDATE_STUDENT_SUCCESS", null, LocaleContextHolder.getLocale()),
							null,  null), HttpStatus.OK);
				
			}
		} catch (Exception e) {
			e.printStackTrace();
			responseEntity = new ResponseEntity<Response>(new Response(true,
					messageSource.getMessage("ADD_STUDENT_FAILED", null, LocaleContextHolder.getLocale()), null,
					null), HttpStatus.OK);
		}
		return responseEntity;
	}

	public ResponseEntity<Response> viewStudent() {
		ResponseEntity<Response> responseEntity = null;
		List<Student> studentList = new ArrayList<>();
		try {
			studentList = studentRepo.findAll();
			responseEntity = new ResponseEntity<Response>(new Response(true,
					messageSource.getMessage("ADD_STUDENT_SUCCESS", null, LocaleContextHolder.getLocale()), null,
					studentList), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			responseEntity = new ResponseEntity<Response>(new Response(true,
					messageSource.getMessage("ADD_STUDENT_FAILED", null, LocaleContextHolder.getLocale()), null,
					studentList), HttpStatus.OK);
		}
		return responseEntity;
	}

	public ResponseEntity<Response> updateStudent(int studentId) {
		ResponseEntity<Response> responseEntity = null;
		List<Student> studentList = new ArrayList<>();
		try {
			Optional<Student> u = studentRepo.findById(studentId);
			responseEntity = new ResponseEntity<Response>(new Response(true,
					messageSource.getMessage("SHOW_EDIT_STUDENT_SUCCESS", null, LocaleContextHolder.getLocale()),u,
					null), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			responseEntity = new ResponseEntity<Response>(new Response(true,
					messageSource.getMessage("SHOW_EDIT_STUDENT_FAILED", null, LocaleContextHolder.getLocale()),
					null, studentList), HttpStatus.OK);
		}
		return responseEntity;
	}

	public ResponseEntity<Response> deleteStudent(int studentId) {
		ResponseEntity<Response> responseEntity = null;
		List<Student> studentList = new ArrayList<>();
		try {
			studentRepo.deleteById(studentId);
			responseEntity = new ResponseEntity<Response>(new Response(true,
					messageSource.getMessage("DELETE_STUDENT_SUCCESS", null, LocaleContextHolder.getLocale()), null,
					null), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			responseEntity = new ResponseEntity<Response>(new Response(true,
					messageSource.getMessage("DELETE_STUDENT_FAILED", null, LocaleContextHolder.getLocale()), null,
					studentList), HttpStatus.OK);
		}
		return responseEntity;
	}

}
