// // auth_provider.dart
// import 'package:flutter/material.dart';
// import 'package:http/http.dart' as http;
// import 'dart:convert';
// import 'package:shared_preferences/shared_preferences.dart';

// class AuthProvider with ChangeNotifier {
//   String? _token;
//   String? _userId;
//   String? _username;

//   String? get token => _token;
//   String? get userId => _userId;
//   String? get username => _username;

//   bool get isAuth => _token != null;

//   Future<void> register(String username, String email, String password) async {
//     const url = 'http://localhost:5000/api/register';
    
//     try {
//       final response = await http.post(
//         Uri.parse(url),
//         headers: {'Content-Type': 'application/json'},
//         body: json.encode({
//           'username': username,
//           'email': email,
//           'password': password,
//         }),
//       );

//       final responseData = json.decode(response.body);
      
//       if (response.statusCode != 201) {
//         throw HttpException(responseData['message']);
//       }

//       _token = responseData['token'];
//       _userId = responseData['userId'];
//       _username = responseData['username'];

//       final prefs = await SharedPreferences.getInstance();
//       prefs.setString('userData', json.encode({
//         'token': _token,
//         'userId': _userId,
//         'username': _username,
//       }));

//       notifyListeners();
//     } catch (error) {
//       rethrow;
//     }
//   }

//   Future<void> login(String username, String password) async {
//     const url = 'http://localhost:5000/api/login';
    
//     try {
//       final response = await http.post(
//         Uri.parse(url),
//         headers: {'Content-Type': 'application/json'},
//         body: json.encode({
//           'username': username,
//           'password': password,
//         }),
//       );

//       final responseData = json.decode(response.body);
      
//       if (response.statusCode != 200) {
//         throw HttpException(responseData['message']);
//       }

//       _token = responseData['token'];
//       _userId = responseData['userId'];
//       _username = responseData['username'];

//       final prefs = await SharedPreferences.getInstance();
//       prefs.setString('userData', json.encode({
//         'token': _token,
//         'userId': _userId,
//         'username': _username,
//       }));

//       notifyListeners();
//     } catch (error) {
//       rethrow;
//     }
//   }

//   Future<bool> tryAutoLogin() async {
//     final prefs = await SharedPreferences.getInstance();
//     if (!prefs.containsKey('userData')) {
//       return false;
//     }

//     final extractedUserData = json.decode(prefs.getString('userData')!) as Map<String, dynamic>;
    
//     _token = extractedUserData['token'];
//     _userId = extractedUserData['userId'];
//     _username = extractedUserData['username'];

//     notifyListeners();
//     return true;
//   }

//   Future<void> logout() async {
//     _token = null;
//     _userId = null;
//     _username = null;
    
//     final prefs = await SharedPreferences.getInstance();
//     prefs.remove('userData');
    
//     notifyListeners();
//   }
// }

// class HttpException implements Exception {
//   final String message;

//   HttpException(this.message);

//   @override
//   String toString() {
//     return message;
//   }
// }



// auth_provider.dart
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class AuthProvider with ChangeNotifier {
  String? _token;
  String? _userId;
  String? _username;

  String? get token => _token;
  String? get userId => _userId;
  String? get username => _username;

  bool get isAuth => _token != null;

  Future<void> register(String username, String email, String password) async {
    const url = 'http://localhost:5000/api/register';
    
    try {
      final response = await http.post(
        Uri.parse(url),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'username': username,
          'email': email,
          'password': password,
        }),
      );

      final responseData = json.decode(response.body);
      
      if (response.statusCode != 201) {
        throw HttpException(responseData['message']);
      }

      _token = responseData['token'];
      _userId = responseData['userId'];
      _username = responseData['username'];

      final prefs = await SharedPreferences.getInstance();
      prefs.setString('userData', json.encode({
        'token': _token,
        'userId': _userId,
        'username': _username,
      }));

      notifyListeners();
    } catch (error) {
      rethrow;
    }
  }

  Future<void> login(String username, String password) async {
    const url = 'http://localhost:5000/api/login';
    
    try {
      final response = await http.post(
        Uri.parse(url),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'username': username,
          'password': password,
        }),
      );

      final responseData = json.decode(response.body);
      
      if (response.statusCode != 200) {
        throw HttpException(responseData['message']);
      }

      _token = responseData['token'];
      _userId = responseData['userId'];
      _username = responseData['username'];

      final prefs = await SharedPreferences.getInstance();
      prefs.setString('userData', json.encode({
        'token': _token,
        'userId': _userId,
        'username': _username,
      }));

      notifyListeners();
    } catch (error) {
      rethrow;
    }
  }

  Future<bool> tryAutoLogin() async {
    final prefs = await SharedPreferences.getInstance();
    if (!prefs.containsKey('userData')) {
      return false;
    }

    final extractedUserData = json.decode(prefs.getString('userData')!) as Map<String, dynamic>;
    
    _token = extractedUserData['token'];
    _userId = extractedUserData['userId'];
    _username = extractedUserData['username'];

    notifyListeners();
    return true;
  }

  Future<void> logout() async {
    _token = null;
    _userId = null;
    _username = null;
    
    final prefs = await SharedPreferences.getInstance();
    prefs.remove('userData');
    
    notifyListeners();
  }
}

class HttpException implements Exception {
  final String message;

  HttpException(this.message);

  @override
  String toString() {
    return message;
  }
}