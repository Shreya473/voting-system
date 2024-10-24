#include <Adafruit_Fingerprint.h>
#include <SoftwareSerial.h>

SoftwareSerial mySerial(18, 19); // You can change these if it is not working on 2 or 3
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&Serial1);

uint8_t id = 1; // Start from ID 1
String fingerprintId = ""; // Variable to store the last enrolled fingerprint ID

void setup()  
{
  Serial.begin(9600);
  Serial1.begin(57600); // Set the baud rate for the fingerprint sensor
  Serial.println("\n\nFingerprint sensor enrollment");

  // Verify fingerprint sensor
  if (finger.verifyPassword()) {
    Serial.println("Found fingerprint sensor!");
  } else {
    Serial.println("Did not find fingerprint sensor :(");
    while (1) { delay(1); }
  }

  // Initialize Serial communication for fetching fingerprint ID
  Serial.println("Ready to enroll a fingerprint!");
}

void loop() {
  // Command to fetch the last enrolled fingerprint ID
  if (Serial.available()) {
    String command = Serial.readStringUntil('\n');
    
    if (command == "FETCH_FINGERPRINT") {
      enrollFingerprint();
      // Send the last enrolled fingerprint ID
      // if (fingerprintId.length() > 0) {
      //   Serial.print("fingerprint:");
      //   Serial.println(fingerprintId); // Send the fingerprint ID
      // } else {
      //   Serial.println("error:Fingerprint not found");
      // }
    }

    if (command == "VERIFY_FINGERPRINT") {
      verify_fingerprint();
      // Send the last enrolled fingerprint ID
      // if (fingerprintId.length() > 0) {
      //   Serial.print("fingerprint:");
      //   Serial.println(fingerprintId); // Send the fingerprint ID
      // } else {
      //   Serial.println("error:Fingerprint not found");
      // }
    }
  }
  
  // Check if a new fingerprint needs to be enrolle

  // enrollFingerprint();
}

// Function to enroll a fingerprint and automatically increment the ID
void enrollFingerprint() {
  Serial.println("Enrolling a new fingerprint...");
  
  // Enroll fingerprints in a loop if needed or modify based on your requirements
  Serial.print("Enrolling ID #");
  Serial.println(id);

  while (!getFingerprintEnroll()) {
    // Wait until the enrollment is completed
  }
  
  // Increment ID for the next fingerprint
  id++;
  if (id > 127) { // Reset if it exceeds the maximum allowed ID
    id = 1; // You can choose to handle it differently based on your requirements
  }
}

uint8_t getFingerprintEnroll() {
  int p = -1;
  Serial.print("Waiting for valid finger to enroll as #"); Serial.println(id);
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    switch (p) {
      case FINGERPRINT_OK:
        Serial.println("Image taken");
        break;
      case FINGERPRINT_NOFINGER:
        Serial.print(".");
        break;
      case FINGERPRINT_PACKETRECIEVEERR:
        Serial.println("Communication error");
        break;
      case FINGERPRINT_IMAGEFAIL:
        Serial.println("Imaging error");
        break;
      default:
        Serial.println("Unknown error");
        break;
    }
  }

  // OK success!
  p = finger.image2Tz(1);
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Image too messy");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return p;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Could not find fingerprint features");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Could not find fingerprint features");
      return p;
    default:
      Serial.println("Unknown error");
      return p;
  }
  
  Serial.println("Remove finger");
  delay(1000);
  p = 0;
  while (p != FINGERPRINT_NOFINGER) {
    p = finger.getImage();
  }
  
  Serial.print("ID "); Serial.println(id);
  // p = -1;
  // Serial.println("Place same finger again");
  // while (p != FINGERPRINT_OK) {
  //   p = finger.getImage();
  //   switch (p) {
  //     case FINGERPRINT_OK:
  //       Serial.println("Image taken");
  //       break;
  //     case FINGERPRINT_NOFINGER:
  //       Serial.print(".");
  //       break;
  //     case FINGERPRINT_PACKETRECIEVEERR:
  //       Serial.println("Communication error");
  //       break;
  //     case FINGERPRINT_IMAGEFAIL:
  //       Serial.println("Imaging error");
  //       break;
  //     default:
  //       Serial.println("Unknown error");
  //       break;
  //   }
  // }

  // OK success!
  // p = finger.image2Tz(2);
  // switch (p) {
  //   case FINGERPRINT_OK:
  //     Serial.println("Image converted");
  //     break;
  //   case FINGERPRINT_IMAGEMESS:
  //     Serial.println("Image too messy");
  //     return p;
  //   case FINGERPRINT_PACKETRECIEVEERR:
  //     Serial.println("Communication error");
  //     return p;
  //   case FINGERPRINT_FEATUREFAIL:
  //     Serial.println("Could not find fingerprint features");
  //     return p;
  //   case FINGERPRINT_INVALIDIMAGE:
  //     Serial.println("Could not find fingerprint features");
  //     return p;
  //   default:
  //     Serial.println("Unknown error");
  //     return p;
  // }
  
  // OK converted!
  Serial.print("Creating model for #");  Serial.println(id);
  
  // p = finger.createModel();
  // if (p == FINGERPRINT_OK) {
  //   Serial.println("Prints matched!");
  // } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
  //   Serial.println("Communication error");
  //   return p;
  // } else if (p == FINGERPRINT_ENROLLMISMATCH) {
  //   Serial.println("Fingerprints did not match");
  //   return p;
  // } else {
  //   Serial.println("Unknown error");
  //   return p;
  // }   
  
  Serial.print("ID "); Serial.println(id);
  p = finger.storeModel(id);
  if (p == FINGERPRINT_OK) {
    Serial.println("Stored!");
    Serial.print("FINGERPRINT_ID: ");
    Serial.println(id);
    fingerprintId = String(id); // Store the enrolled fingerprint ID
    return 1; // Enrollment successful
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    return p;
  } else if (p == FINGERPRINT_BADLOCATION) {
    Serial.println("Could not store in that location");
    return p;
  } else if (p == FINGERPRINT_FLASHERR) {
    Serial.println("Error writing to flash");
    return p;
  } else {
    Serial.println("Unknown error");
    return p;
  }   
}

uint8_t verify_fingerprint() {
  uint8_t p = finger.getImage();
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image taken");
      break;
    case FINGERPRINT_NOFINGER:
      Serial.println("No finger detected");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return p;
    case FINGERPRINT_IMAGEFAIL:
      Serial.println("Imaging error");
      return p;
    default:
      Serial.println("Unknown error");
      return p;
  }

  // OK success!

  p = finger.image2Tz();
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Image too messy");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return p;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Could not find fingerprint features");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Could not find fingerprint features");
      return p;
    default:
      Serial.println("Unknown error");
      return p;
  }

  // OK converted!
  p = finger.fingerFastSearch();
  if (p == FINGERPRINT_OK) {
    Serial.println("Found a print match!");
    Serial.print("Found ID: ");
    Serial.println(finger.fingerID);
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    return p;
  } else if (p == FINGERPRINT_NOTFOUND) {
    Serial.println("Did not find a match");
    return p;
  } else {
    Serial.println("Unknown error");
    return p;
  }
  {digitalWrite(11, HIGH);
  delay(3000);
  digitalWrite(11, LOW);
  Serial.print("Not Found"); 
  Serial.print("Error"); 
  return finger.fingerID;
 }

  // found a match!
  Serial.print("Found ID: ");
  Serial.println(finger.fingerID);
  // Serial.print("Found ID #"); Serial.print(finger.fingerID);
  // Serial.print(" with confidence of "); Serial.println(finger.confidence);

  return finger.fingerID;
}