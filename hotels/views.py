from django.db.models import query
from django.db.models.fields import NullBooleanField
from rest_framework import permissions
from accounts.models import UserAccount # type: ignore
from .models import Booking, Comment, HotelAddress, HotelOwner, HotelType, Hotel, HotelImage, Room, RoomAmenityAssociation, RoomImage, HotelAmenity, RoomAmenity, HotelAmenityAssociation, RoomAmenityAssociation, SavedHotel
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import CommentSerializer, HotelDetailSerializer, HotelTypeSerializer, HotelSerializer, HotelImageSerializer, RoomSerializer, RoomImageSerializer, HotelAddressSerializer, RoomAmenitySerializer, HotelAmenitySerializer, RoomDetailSerializer, RoomHotelAssociationSerializer, RoomAmenityAssociationSerializer, HotelAmenityAssociationSerializer, BookingSerializer, SavedHotelSerializer
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status
from datetime import date, timedelta, datetime
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
import json


###
class HotelTypesView(APIView):
    permission_classes = (permissions.AllowAny, )
    queryset = HotelType.objects.all()
    serializer_class = HotelTypeSerializer
    pagination_class = None

    #GET /api/hotels/hoteltypes/?id
    def get(self, request, *args, **kwargs):
        try:
            id = request.query_params["id"]
            if id != None:
                queryset = HotelType.objects.get(id=id)
                serializer = HotelTypeSerializer(queryset)
                
        except:
            queryset = HotelType.objects.all()
            serializer = HotelTypeSerializer(queryset, many=True)
 
        return Response(serializer.data) 

    #POST /api/hotels/hoteltypes/
    def post(self, request, format=None):
        data = self.request.data

        new_hoteltype = HotelType.objects.create(name=data['name'])
        new_hoteltype.save()

        serializer = HotelTypeSerializer(new_hoteltype)
        return Response(serializer.data, status=status.HTTP_201_CREATED) 

    #PATCH /api/hotels/hoteltypes/?id
    def patch(self, request, *args, **kwargs):
        queryset = HotelType.objects.get(id=request.query_params["id"])
        data = request.data

        queryset.name = data.get("name", queryset.name)

        queryset.save()
        serializer = HotelTypeSerializer(queryset)

        return Response(serializer.data)


    #DELETE /api/hotels/hoteltypes/?id
    def delete(self, request, *args, **kwargs):
        
        queryset = HotelType.objects.get(id=request.query_params["id"])
        queryset.delete()

        return Response({'success': 'Deleted successfully'})


###
class HotelView(RetrieveAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Hotel.objects.all()
    serializer_class = HotelDetailSerializer
    lookup_field = 'slug'


class PartnerHotelsView(APIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = HotelSerializer
    pagination_class = None

    def get(self, request):
        try:
            if request.query_params["email"] != None:
                user_instance = UserAccount.objects.get(email=request.query_params["email"])
                hotels_owner = HotelOwner.objects.filter(user=user_instance)
                print(set([i.hotel_id.id for i in hotels_owner]))
                queryset = Hotel.objects.filter(id__in=set([i.hotel_id.id for i in hotels_owner]))
                serializer = HotelSerializer(queryset, many=True)
                result = serializer.data
        except:
            result = {}
 
        return Response(result) 


class HotelsView(APIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = HotelSerializer
    parser_classes = (MultiPartParser, FormParser)
    pagination_class = None

    #GET /api/hotels/?id
    def get(self, request, *args, **kwargs):
        try:
            if request.query_params["id"] != None:
                queryset = Hotel.objects.get(id=request.query_params["id"])
                serializer = HotelSerializer(queryset)
                
        except:
            queryset = Hotel.objects.all()
            serializer = HotelSerializer(queryset, many=True)
 
        return Response(serializer.data) 

    #POST /api/hotels/
    def post(self, request, *args, **kwargs):
        data = self.request.data
        is_online_checked_in = json.loads(request.POST.get('is_online_checked_in', 'false'))
        hotel_type_instance = HotelType.objects.get(id=data["hotel_type_id"])

        new_hotel = Hotel.objects.create(name=data['name'],sub_name=data['sub_name'],main_photo=data['main_photo'], rating=data['rating'],
        is_online_checked_in=is_online_checked_in,base_price_per_night=data['base_price_per_night'],
        description=data['description'],policy=data['policy'],hotel_type_id=hotel_type_instance)
        new_hotel.save()

        serializer = HotelSerializer(new_hotel)
        return Response(serializer.data, status=status.HTTP_201_CREATED) 

    #PATCH /api/hotels/?id
    def patch(self, request, *args, **kwargs):
        queryset = Hotel.objects.get(id=request.query_params["id"])
        data = request.data
        print(f'136 {data}')

        try:
            if data['is_online_checked_in'] != None:
                if data['is_online_checked_in'] == 'true':
                    queryset.is_online_checked_in = True
                if data['is_online_checked_in'] == 'false':
                    queryset.is_online_checked_in = False
            
        
        except:
            queryset.is_online_checked_in = queryset.is_online_checked_in

        try:
            if data['is_available'] != None and data['is_available'] == 'true':
                queryset.is_available = True
            
            if data['is_available'] != None and data['is_available'] == 'false':
                queryset.is_available = False
        
        except:
            queryset.is_available = queryset.is_available

        queryset.name = data.get("name", queryset.name)
        queryset.sub_name = data.get("sub_name", queryset.sub_name)
        queryset.rating = data.get("rating", queryset.rating)
        queryset.base_price_per_night = data.get("base_price_per_night", queryset.base_price_per_night)
        queryset.main_photo = data.get("main_photo", queryset.main_photo)
        queryset.description = data.get("description", queryset.description)
        queryset.policy = data.get("policy", queryset.policy)

        try:
            if data['hotel_type_id'] != None:
                hotel_type_instance = HotelType.objects.get(id=data["hotel_type_id"])
                queryset.hotel_type_id = hotel_type_instance

        except:
            queryset.hotel_type_id = queryset.hotel_type_id


        queryset.save()
        serializer = HotelSerializer(queryset)

        return Response(serializer.data)


    #DELETE /api/hotels/?id
    def delete(self, request, *args, **kwargs):
        
        queryset = Hotel.objects.get(id=request.query_params["id"])
        queryset.delete()

        return Response({'success': 'Deleted successfully'})


###
class HotelImagesView(APIView):
    permission_classes = (permissions.AllowAny, )
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = HotelImageSerializer
    pagination_class = None

    #GET /api/hotels/hotelimages/?id
    def get(self, request, *args, **kwargs):
        try:
            if request.query_params["hotel_id"] != None:
                queryset = HotelImage.objects.filter(hotel_id=request.query_params["hotel_id"])
                serializer = HotelImageSerializer(queryset, many=True)

            elif request.query_params["id"] != None:
                queryset = HotelImage.objects.get(id=request.query_params["id"])
                serializer = HotelImageSerializer(queryset, many=True)
                
        except:
            queryset = HotelImage.objects.all()
            serializer = HotelImageSerializer(queryset, many=True)
 
        return Response(serializer.data) 

    #POST /api/hotels/hotelimages/
    def post(self, request, format=None):
        data = self.request.data
        hotel_instance = Hotel.objects.get(id=data["hotel_id"])

        images = request.FILES.getlist('images')
        print(images)

        for image in images:
            new_img = HotelImage.objects.create(hotel_id=hotel_instance,image=image)
            new_img.save()

        # serializer = HotelImageSerializer(new_img)
        # return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response({'message' : "Upload successfully"})

    #PATCH /api/hotels/hoteltypes/?id
    #DELETE /api/hotels/hoteltypes/?id
    def delete(self, request, *args, **kwargs):
        
        queryset = HotelImage.objects.get(id=request.query_params["id"])
        queryset.delete()

        return Response({'success': 'Deleted successfully'})



class RoomView(RetrieveAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Room.objects.all()
    serializer_class = RoomDetailSerializer
    lookup_field = 'slug'


class RoomsHotelAssociation(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = RoomHotelAssociationSerializer

    def get(self, request, *args, **kwargs):
        print(request.query_params["hotel_id"])
        try:
            if request.query_params["hotel_id"] != None:
                queryset = Room.objects.filter(hotel_id=request.query_params["hotel_id"])
                serializer = RoomHotelAssociationSerializer(queryset, many=True)         
        except:
            queryset = Room.objects.all()
            serializer = RoomSerializer(queryset, many=True)
           
        return Response(serializer.data)
 
        
###
class RoomsView(APIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = RoomSerializer
    parser_classes = (MultiPartParser, FormParser)
    pagination_class = None

    #GET /api/hotels/?id
    def get(self, request, *args, **kwargs):
        try:
            if request.query_params["id"] != None:
                queryset = Room.objects.get(id=request.query_params["id"], is_available=True)
                serializer = RoomSerializer(queryset)
                
        except:
            queryset = Room.objects.all()
            serializer = RoomSerializer(queryset, many=True)
 
        return Response(serializer.data) 

    #POST /api/hotels/
    def post(self, request, *args, **kwargs):
        data = self.request.data
        print(data)
        hotel_instance = Hotel.objects.get(id=data["hotel_id"])

        new_room = Room.objects.create(name=data["name"],square=data["square"],guest_quantity=data["guest_quantity"],
        main_photo=data['main_photo'],base_price_per_night=data['base_price_per_night'],hotel_id=hotel_instance)
        new_room.save()

        serializer = RoomSerializer(new_room)
        return Response(serializer.data, status=status.HTTP_201_CREATED) 

    #PATCH /api/hotels/?id
    def patch(self, request, *args, **kwargs):
        print(request.data)
        queryset = Room.objects.get(id=request.query_params["id"])
        data = request.data

        queryset.name = data.get("name", queryset.name)
        queryset.square = data.get("square", queryset.square)
        queryset.guest_quantity = data.get("guest_quantity", queryset.guest_quantity)
        queryset.base_price_per_night = data.get("base_price_per_night", queryset.base_price_per_night)
        queryset.main_photo = data.get("main_photo", queryset.main_photo)

        try:
            if data['hotel_id'] != None:
                hotel_instance = Hotel.objects.get(id=data["hotel_id"])
                queryset.hotel_id = hotel_instance

        except:
            queryset.hotel_id = queryset.hotel_id


        queryset.save()
        serializer = RoomSerializer(queryset)

        return Response(serializer.data)


    #DELETE /api/hotels/?id
    def delete(self, request, *args, **kwargs):
        
        queryset = Room.objects.get(id=request.query_params["id"])
        queryset.delete()

        return Response({'success': 'Deleted successfully'})



class RoomImagesView(APIView):
    permission_classes = (permissions.AllowAny, )
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = RoomImageSerializer
    pagination_class = None

    #GET /api/hotels/hotelimages/?id
    def get(self, request, *args, **kwargs):
        try:
            if request.query_params["room_id"] != None:
                queryset = RoomImage.objects.filter(room_id=request.query_params["room_id"])
                serializer = RoomImageSerializer(queryset, many=True)

            elif request.query_params["id"] != None:
                queryset = RoomImage.objects.get(id=request.query_params["id"])
                serializer = RoomImageSerializer(queryset, many=True)
                
        except:
            queryset = RoomImage.objects.all()
            serializer = RoomImageSerializer(queryset, many=True)
 
        return Response(serializer.data) 

    #POST /api/hotels/hotelimages/
    def post(self, request, format=None):
        data = self.request.data
        room_instance = Room.objects.get(id=data["room_id"])

        images = request.FILES.getlist('images')

        for image in images:
            new_img = RoomImage.objects.create(room_id=room_instance,image=image)
            new_img.save()

        return Response({'message' : "Upload successfully"})

    #PATCH /api/hotels/hoteltypes/?id
    #DELETE /api/hotels/hoteltypes/?id
    def delete(self, request, *args, **kwargs):
        
        queryset = RoomImage.objects.get(id=request.query_params["id"])
        queryset.delete()

        return Response({'success': 'Deleted successfully'})


###
class HotelAddressesView(APIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = RoomSerializer
    pagination_class = None

    #GET /api/hotels/?id
    def get(self, request, *args, **kwargs):
        try:
            if request.query_params["id"] != None:
                queryset = HotelAddress.objects.get(id=request.query_params["id"])
                serializer = HotelAddressSerializer(queryset)
                
        except:
            queryset = HotelAddress.objects.all()
            serializer = HotelAddressSerializer(queryset, many=True)
 
        return Response(serializer.data) 

    #POST /api/hotels/
    def post(self, request, *args, **kwargs):
        data = self.request.data
        hotel_instance = Hotel.objects.get(id=data["hotel_id"])

        new_address = HotelAddress.objects.create(full_address=data["full_address"],street=data["street"],ward=data["ward"],
        district=data['district'],city=data['city'],country=data['country'],hotel_id=hotel_instance)
        new_address.save()

        serializer = HotelAddressSerializer(new_address)
        return Response(serializer.data, status=status.HTTP_201_CREATED) 

    #PATCH /api/hotels/?id
    def patch(self, request, *args, **kwargs):
        print(request.data)
        queryset = HotelAddress.objects.get(id=request.query_params["id"])
        data = request.data

        queryset.full_address = data.get("full_address", queryset.full_address)
        queryset.street = data.get("street", queryset.street)
        queryset.ward = data.get("ward", queryset.ward)
        queryset.district = data.get("district", queryset.district)
        queryset.city = data.get("city", queryset.city)
        queryset.country = data.get("country", queryset.country)

        try:
            if data['hotel_id'] != None:
                hotel_instance = Hotel.objects.get(id=data["hotel_id"])
                queryset.hotel_id = hotel_instance

        except:
            queryset.hotel_id = queryset.hotel_id


        queryset.save()
        serializer = HotelAddressSerializer(queryset)

        return Response(serializer.data)


    #DELETE /api/hotels/?id
    def delete(self, request, *args, **kwargs):
        
        queryset = HotelAddress.objects.get(id=request.query_params["id"])
        queryset.delete()

        return Response({'success': 'Deleted successfully'})



class HotelAmenitiesView(APIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = HotelAmenitySerializer
    pagination_class = None

    #GET /api/hotels/?id
    def get(self, request, *args, **kwargs):
        try:
            if request.query_params["id"] != None:
                queryset = HotelAmenity.objects.get(id=request.query_params["id"])
                serializer = HotelAmenitySerializer(queryset)
                
        except:
            queryset = HotelAmenity.objects.all()
            serializer = HotelAmenitySerializer(queryset, many=True)
 
        return Response(serializer.data) 

    #POST /api/hotels/
    def post(self, request, *args, **kwargs):
        data = self.request.data

        new_hotel_amenity = HotelAmenity.objects.create(category=data["category"],name=data["name"])
        new_hotel_amenity.save()

        serializer = HotelAmenitySerializer(new_hotel_amenity)
        return Response(serializer.data, status=status.HTTP_201_CREATED) 

    #PATCH /api/hotels/?id
    def patch(self, request, *args, **kwargs):
        queryset = HotelAmenity.objects.get(id=request.query_params["id"])
        data = request.data

        queryset.category = data.get("category", queryset.category)
        queryset.name = data.get("name", queryset.name)

        queryset.save()
        serializer = HotelAmenitySerializer(queryset)

        return Response(serializer.data)


    #DELETE /api/hotels/?id
    def delete(self, request, *args, **kwargs):
        
        queryset = HotelAmenity.objects.get(id=request.query_params["id"])
        queryset.delete()

        return Response({'success': 'Deleted successfully'})



class RoomAmenitiesView(APIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = RoomAmenitySerializer
    pagination_class = None

    #GET /api/Rooms/?id
    def get(self, request, *args, **kwargs):
        try:
            if request.query_params["id"] != None:
                queryset = RoomAmenity.objects.get(id=request.query_params["id"])
                serializer = RoomAmenitySerializer(queryset)
                
        except:
            queryset = RoomAmenity.objects.all()
            serializer = RoomAmenitySerializer(queryset, many=True)
 
        return Response(serializer.data) 

    #POST /api/Rooms/
    def post(self, request, *args, **kwargs):
        data = self.request.data

        new_room_amenity = RoomAmenity.objects.create(category=data["category"],name=data["name"])
        new_room_amenity.save()

        serializer = RoomAmenitySerializer(new_room_amenity)
        return Response(serializer.data, status=status.HTTP_201_CREATED) 

    #PATCH /api/Rooms/?id
    def patch(self, request, *args, **kwargs):
        queryset = RoomAmenity.objects.get(id=request.query_params["id"])
        data = request.data

        queryset.category = data.get("category", queryset.category)
        queryset.name = data.get("name", queryset.name)

        queryset.save()
        serializer = RoomAmenitySerializer(queryset)

        return Response(serializer.data)



class RoomAmenityAssociationView(APIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = RoomAmenityAssociation
    pagination_class = None

    #GET /api/Rooms/?id
    def get(self, request, *args, **kwargs):
        try:
            if request.query_params["room_id"] != None:
                queryset = RoomAmenityAssociation.objects.filter(room_id=request.query_params["room_id"])
                serializer = RoomAmenityAssociationSerializer(queryset, many=True)
                
        except:
            queryset = RoomAmenityAssociation.objects.all()
            serializer = RoomAmenityAssociationSerializer(queryset, many=True)
 
        return Response(serializer.data) 

    #POST /api/Rooms/
    def post(self, request, *args, **kwargs):
        data = self.request.data

        room_instance = Room.objects.get(id=data["room_id"])
        room_amenity_instance = RoomAmenity.objects.get(id=data["room_amenity_id"])

        new_room_amenity_association = RoomAmenityAssociation.objects.create(room_id=room_instance,room_amenity_id=room_amenity_instance)
        new_room_amenity_association.save()

        serializer = RoomAmenityAssociationSerializer(new_room_amenity_association)
        return Response(serializer.data, status=status.HTTP_201_CREATED) 

    #PATCH /api/Rooms/?id
    def patch(self, request, *args, **kwargs):
        queryset = RoomAmenityAssociation.objects.get(id=request.query_params["id"])
        data = request.data   
        try:
            if data['room_id'] != None:
                room_instance = Room.objects.get(id=data["room_id"])
                queryset.room_id = room_instance

        except:
            queryset.room_id = queryset.room_id

        try:
            if data['room_amenity_id'] != None:
                room_amenity_instance = RoomAmenity.objects.get(id=data["room_amenity_id"])
                queryset.room_amenity_id = room_amenity_instance

        except:
            queryset.room_amenity_id = queryset.room_amenity_id

        queryset.save()
        serializer = RoomAmenityAssociationSerializer(queryset)

        return Response(serializer.data)

    #DELETE /api/Rooms/?id
    def delete(self, request, *args, **kwargs):
        
        queryset = RoomAmenityAssociation.objects.get(id=request.query_params["id"])
        queryset.delete()

        return Response({'success': 'Deleted successfully'})



class HotelAmenityAssociationView(APIView):   
    permission_classes = (permissions.AllowAny, )
    serializer_class = HotelAmenityAssociation
    pagination_class = None

    #GET /api/Hotels/?id
    def get(self, request, *args, **kwargs):
        try:
            if request.query_params["hotel_id"] != None:
                queryset = HotelAmenityAssociation.objects.filter(hotel_id=request.query_params["hotel_id"])
                serializer = HotelAmenityAssociationSerializer(queryset, many=True)
                
        except:
            queryset = HotelAmenityAssociation.objects.all()
            serializer = HotelAmenityAssociationSerializer(queryset, many=True)
 
        return Response(serializer.data) 

    #POST /api/Rooms/
    def post(self, request, *args, **kwargs):
        data = self.request.data

        hotel_instance = Hotel.objects.get(id=data["hotel_id"])
        hotel_amenity_instance = HotelAmenity.objects.get(id=data["hotel_amenity_id"])

        new_hotel_amenity_association = HotelAmenityAssociation.objects.create(hotel_id=hotel_instance,hotel_amenity_id=hotel_amenity_instance)
        new_hotel_amenity_association.save()

        serializer = HotelAmenityAssociationSerializer(new_hotel_amenity_association)
        return Response(serializer.data, status=status.HTTP_201_CREATED) 

    #PATCH /api/Rooms/?id
    def patch(self, request, *args, **kwargs):
        queryset = RoomAmenityAssociation.objects.get(id=request.query_params["id"])
        data = request.data   
        try:
            if data['hotel_id'] != None:
                hotel_instance = Hotel.objects.get(id=data["hotel_id"])
                queryset.hotel_id = hotel_instance

        except:
            queryset.hotel_id = queryset.hotel_id

        try:
            if data['hotel_amenity_id'] != None:
                hotel_amenity_instance = HotelAmenity.objects.get(id=data["hotel_amenity_id"])
                queryset.hotel_amenity_id = hotel_amenity_instance

        except:
            queryset.hotel_amenity_id = queryset.hotel_amenity_id

        queryset.save()
        serializer = HotelAmenityAssociationSerializer(queryset)

        return Response(serializer.data)

    #DELETE /api/Rooms/?id
    def delete(self, request, *args, **kwargs):
        
        queryset = HotelAmenityAssociation.objects.get(id=request.query_params["id"])
        queryset.delete()

        return Response({'success': 'Deleted successfully'})



class HotelSearch(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = HotelSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    pagination_class = None
    # filter_fields = ('city', 'country')
    # search_fields = ('^city', 'country')

    def get_queryset(self):
        checkin = self.request.query_params.get('checkin', date.today())
        checkout = self.request.query_params.get('checkout', date.today() + timedelta(days=1))
        guest_quantity = self.request.query_params.get('guest_quantity', 1)
        city = self.request.query_params.get('city', '')
        ha = HotelAddress.objects.filter(city__icontains=city) 
        print(set([i.hotel_id.id for i in ha]))
        queryset = Hotel.objects.filter(id__in=set([i.hotel_id.id for i in ha]))
        return queryset


class PartnerBookingsView(APIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = BookingSerializer
    pagination_class = None

    def get(self, request):
        try:
            if request.query_params.get('email') != None:
                
                email = request.query_params.get('email')
                ho = HotelOwner.objects.filter(user__email__iexact=email) 
                print(set([i.hotel_id.id for i in ho]))
                queryset = Booking.objects.filter(hotel_id__in=set([i.hotel_id.id for i in ho]))
                serializer = BookingSerializer(queryset, many=True)
                result = serializer.data
        except:
            result = {}

        return Response(result)


class BookingsView(APIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = BookingSerializer
    pagination_class = None

    #GET /api/hotels/?id
    def get(self, request, *args, **kwargs):
        try:
            if request.query_params["id"] != None:
                queryset = Booking.objects.get(id=request.query_params["id"])
                serializer = BookingSerializer(queryset)
                
        except:
            queryset = Booking.objects.all()
            serializer = BookingSerializer(queryset, many=True)
 
        return Response(serializer.data) 

    #POST /api/hotels/
    def post(self, request, *args, **kwargs):
        data = self.request.data
        hotel_instance = Hotel.objects.get(id=data["hotel_id"])
        room_instance = Room.objects.get(id=data["room_id"])  

        new_booking = Booking.objects.create(hotel_id=hotel_instance, room_id=room_instance,payment=data["payment"],
        checkin=datetime.strptime(data["checkin"],'%Y-%m-%d').date(), checkout=datetime.strptime(data["checkout"],'%Y-%m-%d').date(),
        guest_name=data["guest_name"], phone=data["guest_phone"],email=data["guest_email"], number_of_guest=data["number_of_guest"])

        try:
            if data['user'] != None:                
                user_instance = UserAccount.objects.get(email=data["user"])
                new_booking.user = user_instance

        except:
            pass

        try:
            if data['is_paid'] != None:
                print(data['is_paid'])                                
                new_booking.is_paid = True

        except:
            pass

        new_booking.save()

        serializer = BookingSerializer(new_booking)
        return Response(serializer.data, status=status.HTTP_201_CREATED) 

    #PATCH /api/hotels/?id
    def patch(self, request, *args, **kwargs):
        queryset = Booking.objects.get(id=request.query_params["id"])
        data = request.data

        try:
            is_cancel = data['is_cancel']
            if is_cancel != None:
                queryset.is_cancel = is_cancel  
        
        except:
            queryset.is_cancel = queryset.is_cancel


        try:
            if data.get("checkin") != None:
                queryset.checkin = datetime.strptime(data.get("checkin"),'%Y-%m-%d').date()
        except:
            queryset.checkin = queryset.checkin

        try:
            if data.get("checkout") != None:
                queryset.checkout = datetime.strptime(data.get("checkout"),'%Y-%m-%d').date()
        except:
            queryset.checkout = queryset.checkout

        
        queryset.guest_name = data.get("guest_name", queryset.guest_name)
        queryset.phone = data.get("guest_phone", queryset.phone)
        queryset.email = data.get("guest_email", queryset.email)
        queryset.payment = data.get("payment", queryset.payment)
        queryset.is_paid = data.get("is_paid", queryset.is_paid)

        try:
            if data['hotel_id'] != None:
                hotel_instance = Hotel.objects.get(id=data["hotel_id"])
                queryset.hotel_id = hotel_instance

        except:
            queryset.hotel_id = queryset.hotel_id

        try:
            if data['room_id'] != None:
                room_instance = Room.objects.get(id=data["room_id"])
                queryset.room_id = room_instance

        except:
            queryset.room_id = queryset.room_id

        try:
            if data['user'] != None:                
                user_instance = UserAccount.objects.get(email=data["user"])
                queryset.user = user_instance

        except:
            queryset.user = queryset.user


        queryset.save()
        serializer = BookingSerializer(queryset)

        return Response(serializer.data)


    #DELETE /api/hotels/?id
    def delete(self, request, *args, **kwargs):
        
        queryset = Booking.objects.get(id=request.query_params["id"])
        queryset.delete()

        return Response({'success': 'Deleted successfully'})



class UserBookingsView(APIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = BookingSerializer
    pagination_class = None

    def get(self, request):
        try:
            if request.query_params["email"] != None:
                user_instance = UserAccount.objects.get(email=request.query_params["email"])
                queryset = Booking.objects.filter(user=user_instance)
                serializer = BookingSerializer(queryset, many=True)
                result = serializer.data
        except:
            result = {}
 
        return Response(result) 



class RoomBookingsView(APIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = BookingSerializer
    pagination_class = None

    def get(self, request):
        try:
            if request.query_params["room_id"] != None:
                queryset = Booking.objects.filter(room_id__id=request.query_params["room_id"])
                serializer = BookingSerializer(queryset, many=True)
                result = serializer.data
        except:
            result = {}
 
        return Response(result) 



class SavedHotelsView(APIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = SavedHotelSerializer
    pagination_class = None

    #GET /api/hotels/?id
    def get(self, request, *args, **kwargs):
        try:
            if request.query_params["email"] != None:
                user_instance = UserAccount.objects.get(email=request.query_params["email"])
                queryset = SavedHotel.objects.filter(user=user_instance)
                serializer = SavedHotelSerializer(queryset, many=True)
                result = serializer.data
        except:
            result = {}
 
        return Response(result) 

    #POST /api/hotels/
    def post(self, request, *args, **kwargs):
        data = self.request.data
        hotel_instance = Hotel.objects.get(id=data["hotel_id"])
        user_instance = UserAccount.objects.get(email=data["email"])

        new_saved_hotel = SavedHotel.objects.create(user=user_instance, hotel_id=hotel_instance)
        new_saved_hotel.save()

        serializer = SavedHotelSerializer(new_saved_hotel)
        return Response(serializer.data, status=status.HTTP_201_CREATED) 

    #DELETE /api/hotels/?id
    def delete(self, request, *args, **kwargs):
        
        queryset = SavedHotel.objects.get(id=request.query_params["id"])
        queryset.delete()

        return Response({'success': 'Deleted successfully'})



class CommentsView(APIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = CommentSerializer
    pagination_class = None

    #GET /api/hotels/?id
    def get(self, request, *args, **kwargs):
        try:
            if request.query_params["hotel_id"] != None:
                queryset = Comment.objects.filter(booking_id__hotel_id__id=request.query_params["hotel_id"])
                serializer = CommentSerializer(queryset, many=True)
                result = serializer.data
                
        except:
            if request.query_params["email"] != None:
                queryset = Comment.objects.filter(booking_id__user__email=request.query_params["email"])
                serializer = CommentSerializer(queryset, many=True)
                result = serializer.data
            else:
                result = {}
        
        return Response(result) 

    #POST /api/hotels/
    def post(self, request, *args, **kwargs):
        data = self.request.data
        booking_instance = Booking.objects.get(id=data["booking_id"])

        new_comment = Comment.objects.create(content=data['content'], rate=data['rate'], booking_id=booking_instance)
        new_comment.save()

        serializer = CommentSerializer(new_comment)
        return Response(serializer.data, status=status.HTTP_201_CREATED) 

    #PATCH /api/hotels/?id
    def patch(self, request, *args, **kwargs):
        print(request.data)
        queryset = Comment.objects.get(id=request.query_params["id"])
        data = request.data

        queryset.content = data.get("content", queryset.content)
        queryset.rate = data.get("rate", queryset.rate)

        try:
            if data['booking_id'] != None:
                booking_instance = Booking.objects.get(id=data["booking_id"])
                queryset.booking_id = booking_instance

        except:
            queryset.booking_id = queryset.booking_id


        queryset.save()
        serializer = CommentSerializer(queryset)

        return Response(serializer.data)


    #DELETE /api/hotels/?id
    def delete(self, request, *args, **kwargs):
        
        queryset = Comment.objects.get(id=request.query_params["id"])
        queryset.delete()

        return Response({'success': 'Deleted successfully'})