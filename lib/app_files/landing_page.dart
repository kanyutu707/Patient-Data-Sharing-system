import 'dart:async';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get/instance_manager.dart';
import 'package:patient/app_files/indexPage.dart';
import 'package:patient/app_files/login_page.dart';
import 'package:shared_preferences/shared_preferences.dart';

var finalEmail;

class landing_page extends StatefulWidget {
  const landing_page({super.key});

  @override
  State<landing_page> createState() => _landing_pageState();
}

class _landing_pageState extends State<landing_page> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('NHMS'),
        backgroundColor: Colors.blue,
      ),
      body: Center(
          child: Stack(
        children: [
          Container(
            alignment: Alignment.center,
            child: Image.network(
              'https://images.all-free-download.com/images/graphiclarge/big_ben_clockface_192640.jpg',
              height: double.infinity,
              width: double.infinity,
              fit: BoxFit.cover,
            ),
          ),
          Container(
            alignment: Alignment.center,
            child: ElevatedButton(
              child: const Text(
                'LOGIN',
                style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 24.0),
              ),
              onPressed: () {
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (context) => const login_page(),
                ));
              },
            ),
          )
        ],
      )),
    );
  }
}
