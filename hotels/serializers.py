from rest_framework import serializers
from .models import *

class HotelTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelType
        fields = '__all__'

class HotelDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = '__all__'
        lookup_field = 'slug'
        depth = 1


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = '__all__'


class RoomDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'
        lookup_field = 'slug'
        depth = 2


class RoomHotelAssociationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'
        depth = 1


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'


class RoomImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomImage
        fields = '__all__'


class HotelImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelImage
        fields = '__all__'


class HotelAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelAddress
        fields = '__all__'
        depth=2


class HotelAmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelAmenity
        fields = '__all__'


class HotelAmenityAssociationSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelAmenityAssociation
        fields = '__all__'
        depth=1



class RoomAmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomAmenity
        fields = '__all__'


class RoomAmenityAssociationSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomAmenityAssociation
        fields = '__all__'
        depth=1


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
        depth = 1


class SavedHotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedHotel
        fields = '__all__'
        depth = 1


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        depth = 2