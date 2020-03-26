package com.vishal;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/Login")
public class Login extends HttpServlet{
	
	 protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	        String un = request.getParameter("user");
	        String pw = request.getParameter("password");


	        try {
	            Class.forName("com.mysql.jdbc.Driver");
	            Connection c = DriverManager.getConnection("jdbc:mysql://localhost:3306/project","root","root");
	            PreparedStatement ps = c.prepareStatement("select Mail,Password from stack where Mail=? and Password=?");
	            ps.setString(1, un);
	            ps.setString(2, pw);

	            ResultSet rs = ps.executeQuery();
	            

	            while (rs.next()) {
	                response.sendRedirect("wec.jsp");
	                return;
	            }
	            response.sendRedirect("wrong.html");
	            return;
	        } catch (ClassNotFoundException |SQLException e) {
	            e.printStackTrace();
	        }

}}
