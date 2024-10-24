#include <SoftwareSerial.h>
#include <DFRobot_ID809.h>
// #include <DFRobot_Fingerprint.h>

SoftwareSerial mySerial(18, 19); // RX, TX for software serial
DFRobot_ID809 finger(&Serial1);

void setup() {
    Serial.begin(9600);
    while (!Serial);  // Wait for the serial to initialize
    delay(100);
    Serial.println("\n\nFingerprint sensor enrollment");

    // Set the data rate for the fingerprint sensor
    Serial1.begin(57600);
    
    if (finger.begin()) {
        Serial.println("Found fingerprint sensor!");
    } else {
        Serial.println("Did not find fingerprint sensor :(");
        while (1) { delay(1); }  // Halt execution if sensor is not found
    }
}

void loop() {
    // Wait for the command from the backend
    if (Serial.available() > 0) {
        String command = Serial.readStringUntil('\n');
        if (command == "FETCH_FINGERPRINT") {
            enrollFingerprint();
        }
    }
}

void enrollFingerprint() {
    Serial.println("Place your finger on the sensor...");

    int id = -1;

    // Step 1: Enroll fingerprint
    id = finger.enroll(); // Enroll a new fingerprint
    if (id >= 0) {
        Serial.print("Fingerprint enrolled successfully. ID: ");
        Serial.println(id);

        // Step 2: Retrieve the fingerprint template
        uint8_t templateData[512]; // Array to store the fingerprint template
        uint8_t templateLength = finger.getTemplate(templateData); // Get the template data

        if (templateLength > 0) {
            Serial.print("FINGERPRINT_DATA: ");
            for (uint8_t i = 0; i < templateLength; i++) {
                if (templateData[i] < 0x10) {
                    Serial.print("0"); // Add leading zero for single-digit hex values
                }
                Serial.print(templateData[i], HEX); // Print the template as hex
                Serial.print(" "); // Print a space for readability
            }
            Serial.println(); // New line after printing all bytes
        } else {
            Serial.println("Error retrieving fingerprint template.");
        }
    } else {
        Serial.print("Error enrolling fingerprint: ");
        Serial.println(id);
    }
}
