package com.vishal;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class update
 */
@WebServlet("/update")
public class update extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	//	doGet(request, response);
		String mail=request.getParameter("mail");
		String up=request.getParameter("up");
		try {
			Class.forName("com.mysql.jdbc.Driver");
			Connection con=DriverManager.getConnection("jdbc:mysql://localhost:3306/project","root","root");
			PreparedStatement ps=con.prepareStatement("update stack set Password=? where Mail=?");
			
			ps.setString(1, up);
			ps.setString(2, mail);
			
			int i=ps.executeUpdate();
			if(i>0) {
				response.sendRedirect("Login.html");
			}
			else {
				response.sendRedirect("wrong.html");
			}
			
			
		}
		catch(SQLException | ClassNotFoundException e) {
			System.out.println(e);
		}
	}

}
