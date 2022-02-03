package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Response;
import com.example.demo.model.Student;
import com.example.demo.service.StudentService;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/student")
public class StudentController {

	
	@Autowired
	private StudentService studentService;
	
	@Autowired
	private MessageSource messageSource;
	
	@PostMapping(path = "/addStudent")
	public ResponseEntity<Response> saveStudent(@RequestBody Student student) {
		ResponseEntity<Response> responseEntity = null;
		try {
			responseEntity = studentService.saveStudent(student);
		} catch (Exception e) {
			e.printStackTrace();
			responseEntity = new ResponseEntity<Response>(new Response(false,
					messageSource.getMessage("ADD_STUDENT_FAILED", null, LocaleContextHolder.getLocale()), null,
					null), HttpStatus.OK);
		}
		return responseEntity;
	}

	@GetMapping(path = "/viewStudent")
	
	public ResponseEntity<Response> viewStudent() {
		ResponseEntity<Response> responseEntity = null;
		try {
			responseEntity = studentService.viewStudent();
		} catch (Exception e) {
			e.printStackTrace();
			responseEntity = new ResponseEntity<Response>(new Response(false,
					messageSource.getMessage("VIEW_STUDENT_FAILED", null, LocaleContextHolder.getLocale()),  null,
					null), HttpStatus.OK);
		}
		return responseEntity;
	}

	@PutMapping(value = "/editStudent/{studentId}")
	
	public ResponseEntity<Response> editStudent(@PathVariable("studentId") int studentId) {
		ResponseEntity<Response> responseEntity = null;
		try {
			responseEntity = studentService.updateStudent(studentId);
		} catch (Exception e) {
			e.printStackTrace();
			responseEntity = new ResponseEntity<Response>(new Response(false,
					messageSource.getMessage("SHOW_EDIT_STUDENT_FAILED", null, LocaleContextHolder.getLocale()), 
					null, null), HttpStatus.OK);
		}
		return responseEntity;
	}

	@DeleteMapping(value = "/deleteStudent/{studentId}")
	
	public ResponseEntity<Response> deleteStudent(@PathVariable("studentId") int studentId) {
		ResponseEntity<Response> responseEntity = null;
		try {
			responseEntity = studentService.deleteStudent(studentId);
		} catch (Exception e) {
			e.printStackTrace();
			responseEntity = new ResponseEntity<Response>(new Response(false,
					messageSource.getMessage("DELETE_STUDENT_FAILED", null, LocaleContextHolder.getLocale()), null,
					null), HttpStatus.OK);
		}
		return responseEntity;
	}

}
