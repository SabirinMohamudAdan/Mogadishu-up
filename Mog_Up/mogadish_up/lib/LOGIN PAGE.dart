import 'package:flutter/material.dart';

// LOGIN PAGE
class LoginPage extends StatelessWidget {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: _buildGradientBackground(),
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 32),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Text("Welcome,", style: _titleStyle()),
                SizedBox(height: 8),
                Text("Sign in to continue!", style: _subtitleStyle()),
                SizedBox(height: 32),
                _buildInput(emailController, "Email"),
                SizedBox(height: 16),
                _buildInput(passwordController, "Password", obscure: true),
                Align(
                  alignment: Alignment.centerRight,
                  child: TextButton(
                    onPressed: () {},
                    child: Text("Forgot Password?",
                        style: TextStyle(color: Colors.white)),
                  ),
                ),
                SizedBox(height: 16),
                _buildMainButton("Login", () {
                  // TODO: Login logic
                }),
                SizedBox(height: 12),
                SizedBox(height: 20),
                GestureDetector(
                  onTap: () {
                    Navigator.push(context,
                        MaterialPageRoute(builder: (_) => RegisterPage()));
                  },
                  child: Text("I'm a new user, Sign Up",
                      style: TextStyle(color: Colors.white)),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// REGISTER PAGE
class RegisterPage extends StatefulWidget {
  @override
  _RegisterPageState createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final nameController = TextEditingController();
  final emailController = TextEditingController();
  final locationController = TextEditingController();
  final ageController = TextEditingController();
  final phoneController = TextEditingController();
  final districtController = TextEditingController();
  final passwordController = TextEditingController();
  final confirmPasswordController = TextEditingController();

  String role = 'Teacher/Student';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: _buildGradientBackground(),
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 32),
            child: Column(
              children: [
                Text("Create Account,", style: _titleStyle()),
                SizedBox(height: 8),
                Text("Sign up to get started!", style: _subtitleStyle()),
                SizedBox(height: 32),
                _buildInput(nameController, "Full Name"),
                SizedBox(height: 12),
                _buildInput(emailController, "Email"),
                SizedBox(height: 12),
                _buildInput(locationController, "Location"),
                SizedBox(height: 12),
                _buildInput(ageController, "Age"),
                SizedBox(height: 12),
                _buildInput(phoneController, "Phone"),
                SizedBox(height: 12),
                _buildInput(districtController, "District"),
                SizedBox(height: 12),
                _buildInput(passwordController, "Password", obscure: true),
                SizedBox(height: 12),
                _buildInput(confirmPasswordController, "Confirm Password",
                    obscure: true),
                SizedBox(height: 12),
                _buildDropdown(
                    "Role", ['Teacher/Student', 'Government', 'Shacab'], role,
                    (value) {
                  setState(() => role = value);
                }),
                SizedBox(height: 12),
                SizedBox(height: 16),
                _buildMainButton("Submit/Reg", () {
                  // TODO: Registration logic
                }),
                SizedBox(height: 12),
                SizedBox(height: 20),
                GestureDetector(
                  onTap: () => Navigator.pop(context),
                  child: Text("I'm already a member. Sign In",
                      style: TextStyle(color: Colors.white)),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// REUSABLE WIDGETS & STYLES

BoxDecoration _buildGradientBackground() {
  return const BoxDecoration(
    gradient: LinearGradient(
      colors: [Color(0xFFFDCB90), Color(0xFFF97D9E)],
      begin: Alignment.topLeft,
      end: Alignment.bottomRight,
    ),
  );
}

TextStyle _titleStyle() {
  return const TextStyle(
      fontSize: 28, fontWeight: FontWeight.bold, color: Colors.white);
}

TextStyle _subtitleStyle() {
  return const TextStyle(color: Colors.white70);
}

Widget _buildInput(TextEditingController controller, String label,
    {bool obscure = false}) {
  return TextField(
    controller: controller,
    obscureText: obscure,
    decoration: InputDecoration(
      filled: true,
      fillColor: Colors.white,
      hintText: label,
      contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(30),
        borderSide: BorderSide.none,
      ),
    ),
  );
}

Widget _buildDropdown(String hint, List<String> items, String value,
    void Function(String) onChanged) {
  return Container(
    padding: const EdgeInsets.symmetric(horizontal: 20),
    decoration: BoxDecoration(
      color: Colors.white,
      borderRadius: BorderRadius.circular(30),
    ),
    child: DropdownButton<String>(
      value: value,
      isExpanded: true,
      underline: SizedBox(),
      onChanged: (newValue) {
        if (newValue != null) onChanged(newValue);
      },
      items: items.map<DropdownMenuItem<String>>((String val) {
        return DropdownMenuItem<String>(
          value: val,
          child: Text(val),
        );
      }).toList(),
    ),
  );
}

Widget _buildMainButton(String text, VoidCallback onPressed) {
  return Container(
    width: double.infinity,
    height: 50,
    decoration: BoxDecoration(
      gradient:
          const LinearGradient(colors: [Color(0xFFF97D9E), Color(0xFFFDCB90)]),
      borderRadius: BorderRadius.circular(30),
    ),
    child: ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: Colors.transparent,
        shadowColor: Colors.transparent,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
      ),
      child: Text(text, style: TextStyle(fontSize: 16)),
),
);
}