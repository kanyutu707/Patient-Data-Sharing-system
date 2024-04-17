import 'package:flutter/material.dart';
import 'package:patient/app_files/login_page.dart';
import 'package:patient/app_files/indexPage.dart';

class bottom_bar extends StatefulWidget {
  const bottom_bar({super.key});

  @override
  State<bottom_bar> createState() => _bottom_barState();
}

class _bottom_barState extends State<bottom_bar> {
  int currentIndex = 0;
  late PageController _pageController;

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
          body: SizedBox(
            child: PageView(
              controller: _pageController,
              onPageChanged: (index) {
                setState(() {
                  currentIndex = index;
                });
              },
              children: [
                Container(
                  color: Colors.white,
                  child: const indexPage(),
                ),
               
                Container(
                  color: Colors.blue,
                  child:const login_page(),
                ),
              ],
            ),
          ),
          bottomNavigationBar: Theme(
              data: Theme.of(context).copyWith(
                  canvasColor: Colors.blue,
                  primaryColor: Colors.black,
                  textTheme: Theme.of(context)
                      .textTheme
                      .copyWith(bodySmall: const TextStyle(color: Colors.yellow))),
              child: BottomNavigationBar(
                  type: BottomNavigationBarType.fixed,
                  onTap: (index) {
                    setState(() {
                      _pageController.jumpToPage(index);
                    });
                  },
                  items: const [
                    BottomNavigationBarItem(
                        label: 'Home', icon: Icon(Icons.home)),
                    BottomNavigationBarItem(
                        label: 'Logout', icon: Icon(Icons.logout)),
                  ]))),
    );
  }
}
