
import java.awt.MouseInfo;
import java.awt.Point;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.event.InputEvent;
import java.awt.event.KeyEvent;

public class Main {
	public static Robot robot;

	public static void main(String[] args) {

		try {
			robot = new Robot();
			Thread.sleep(5000);
			
			
			Point a = MouseInfo.getPointerInfo().getLocation();
			Toolkit.getDefaultToolkit().beep();
			
			Thread.sleep(5000);
			Point b = MouseInfo.getPointerInfo().getLocation();
			Toolkit.getDefaultToolkit().beep();
			
			Thread.sleep(5000);
			Point c = MouseInfo.getPointerInfo().getLocation();
			Toolkit.getDefaultToolkit().beep();			
			
			Thread.sleep(5000);
			Point f = MouseInfo.getPointerInfo().getLocation();
			Toolkit.getDefaultToolkit().beep();			
			
		/*	Thread.sleep(5000);
			Point h = MouseInfo.getPointerInfo().getLocation();
			Toolkit.getDefaultToolkit().beep();*/
			
			Thread.sleep(5000);
			Point i = MouseInfo.getPointerInfo().getLocation();
			Toolkit.getDefaultToolkit().beep();
			
			Thread.sleep(5000);
			Point j = MouseInfo.getPointerInfo().getLocation();
			Toolkit.getDefaultToolkit().beep();
			
			Thread.sleep(5000);

			

			for (int z = 1; z < 26; z++) {
				robot.mouseMove((int) a.getX(), (int) a.getY());
				robot.mousePress(InputEvent.BUTTON1_MASK);
				robot.mouseRelease(InputEvent.BUTTON1_MASK);
				robot.keyPress(KeyEvent.VK_ENTER);
				robot.keyRelease(KeyEvent.VK_ENTER);
				Thread.sleep(800);
				// 1 Click File

				robot.mouseMove((int) b.getX(), (int) b.getY());
				robot.mousePress(InputEvent.BUTTON3_MASK);
				robot.mouseRelease(InputEvent.BUTTON3_MASK);
				Thread.sleep(1000);
				// 2 Right Click File

				robot.mouseMove((int) c.getX(), (int) c.getY());
				robot.mousePress(InputEvent.BUTTON1_MASK);
				robot.mouseRelease(InputEvent.BUTTON1_MASK);
				Thread.sleep(1000);
				// 3 Print
				
				//robot.keyPress(KeyEvent.VK_UP);
				//robot.keyRelease(KeyEvent.VK_UP);
				robot.keyPress(KeyEvent.VK_ENTER);
				robot.keyRelease(KeyEvent.VK_ENTER);
				Thread.sleep(1000);				

				robot.mouseMove((int) f.getX(), (int) f.getY());
				robot.mousePress(InputEvent.BUTTON1_MASK);
				robot.mouseRelease(InputEvent.BUTTON1_MASK);
				Thread.sleep(1000);
				// 6 Print Dialog

				pressKey(z);
				Thread.sleep(1000);

				robot.keyPress(KeyEvent.VK_ENTER);
				robot.keyRelease(KeyEvent.VK_ENTER);
				Thread.sleep(1000);

				/*robot.mouseMove((int) h.getX(), (int) h.getY());
				robot.mousePress(InputEvent.BUTTON1_MASK);
				robot.mouseRelease(InputEvent.BUTTON1_MASK);
				Thread.sleep(400);
				// 8 close pdf*/

				robot.mouseMove((int) i.getX(), (int) i.getY());
				robot.mousePress(InputEvent.BUTTON3_MASK);
				robot.mouseRelease(InputEvent.BUTTON3_MASK);
				Thread.sleep(5000);
				// 9 right click flash icon

				robot.mouseMove((int) j.getX(), (int) j.getY());
				robot.mousePress(InputEvent.BUTTON1_MASK);
				robot.mouseRelease(InputEvent.BUTTON1_MASK);
				Thread.sleep(1000);
				// 10 close flash

				robot.keyPress(KeyEvent.VK_DELETE);
				robot.keyRelease(KeyEvent.VK_DELETE);
				Thread.sleep(1000);
				robot.keyPress(KeyEvent.VK_ENTER);
				robot.keyRelease(KeyEvent.VK_ENTER);
				Thread.sleep(1000);
			}
			System.out.println(a.getX());
			System.out.println(a.getY());
			System.out.println(b.getX());
			System.out.println(b.getY());
			System.out.println(c.getX());
			System.out.println(c.getY());
			System.out.println(f.getX());
			System.out.println(f.getY());
			System.out.println(i.getX());
			System.out.println(i.getY());
			System.out.println(j.getX());
			System.out.println(j.getY());
	
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void pressKey(int z) {
		int x = z;
		String y = "9";
		while (x > 0) {
			y = y + x % 10;
			x = x / 10;
		}
		x = Integer.parseInt(y);
		while (x > 0) {
			int num = x % 10;
			x = x / 10;
			if (num == 0) {
				robot.keyPress(KeyEvent.VK_0);
			} else if (num == 1) {
				robot.keyPress(KeyEvent.VK_1);
			} else if (num == 2) {
				robot.keyPress(KeyEvent.VK_2);
			} else if (num == 3) {
				robot.keyPress(KeyEvent.VK_3);
			} else if (num == 4) {
				robot.keyPress(KeyEvent.VK_4);
			} else if (num == 5) {
				robot.keyPress(KeyEvent.VK_5);
			} else if (num == 6) {
				robot.keyPress(KeyEvent.VK_6);
			} else if (num == 7) {
				robot.keyPress(KeyEvent.VK_7);
			} else if (num == 8) {
				robot.keyPress(KeyEvent.VK_8);
			} else if (num == 9) {
				robot.keyPress(KeyEvent.VK_9);
			}
		}
	}

}
