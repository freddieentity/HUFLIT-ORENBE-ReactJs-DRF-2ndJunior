import React from "react";
import { Page, Text, View, Document, Image } from "@react-pdf/renderer";

function DocumentPDF({ gb }) {
  return (
    <Document>
      <Page
        style={{
          textAlign: "center",
          backgroundColor: "#fff",
          padding: "10px 10px 20px 10px",
          fontSize: "16px",
        }}
      >
        <View key={gb.id}>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                color: "#fff",
                padding: "20px 0px 20px 0px",
                backgroundColor: "#5d9cb3",
              }}
            >
              ORENBE
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                padding: "40px 0px 20px 0px",
              }}
            >
              INVOICE
            </Text>
            <View style={{ textAlign: "left", padding: "20px 0px 20px 0px" }}>
              <Text style={{ fontWeight: "bold" }}>CUSTOMER</Text>
              <Text>Name: {gb.guest_name}</Text>
              <Text>Email: {gb.email}</Text>
              <Text>Phone: {gb.phone}</Text>
            </View>
            <View style={{ textAlign: "left", padding: "20px 0px 20px 0px" }}>
              <Text style={{ fontWeight: "bold" }}>PAYMENT</Text>
              <Text>
                {" "}
                {gb.payment_at
                  ? "Paid at: " + gb.payment_at
                  : "Status: Pay upon check-in"}
              </Text>
              <Text style={{ color: "red" }}>
                {gb.is_cancel && "***DISCLAIMER: BOOKING HAS BEEN CANCELED***"}
              </Text>
            </View>

            <View style={{ textAlign: "left", padding: "20px 0px 20px 0px" }}>
              <Text style={{ fontWeight: "bold" }}>DESTINATION</Text>
              <Text>Avenue: {gb.hotel_id.name}</Text>
              <Text>
                Check-in: {gb.checkin} - Check-out: {gb.checkout}{" "}
              </Text>
            </View>

            <View style={{ textAlign: "left", padding: "20px 0px 20px 0px" }}>
              <Text style={{ fontWeight: "bold" }}>PURCHASE DETAIL</Text>
              <Text>Room: {gb.room_id.name}</Text>
              <Text>Guest: {gb.room_id.guest_quantity}</Text>
              <Text>Square: {gb.room_id.square} (sqft)</Text>
              <Text>Final cost: $ {gb.payment}</Text>
            </View>
            {gb.is_paid && (
              <Image
                style={{ height: "150px", width: "150px" }}
                src={`https://image.freepik.com/free-vector/paid-stamp_1017-8234.jpg`}
              />
            )}
            {!gb.is_paid && gb.payment > 0 && (
              <Image
                style={{ height: "150px", width: "150px" }}
                src={`https://previews.123rf.com/images/newdesignillustrations/newdesignillustrations1902/newdesignillustrations190203829/116205220-partial-payment-stamp-seal-watermark-with-distress-style-designed-with-rectangle-circles-and-stars-b.jpg`}
              />
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default DocumentPDF;
