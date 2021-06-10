from django.contrib import admin
from .models import Booking, Comment, HotelAddress, HotelOwner, HotelType, Hotel, HotelImage, Room, RoomImage, HotelAddress, HotelAmenity, RoomAmenity, RoomAmenityAssociation, HotelAmenityAssociation, SavedHotel


class HotelTypeAdmin(admin.ModelAdmin):
    list_display = ('name',)
    list_display_links = ('name',)
    search_fields = ('name',)
    list_per_page = 25


class HotelAdmin(admin.ModelAdmin):
    exclude = ('slug',)
    list_display = ('name','hotel_type_id','rating','base_price_per_night',)
    list_display_links = ('name',)
    search_fields = ('name','hotel_type_id')
    list_per_page = 25


class RoomAdmin(admin.ModelAdmin):
    exclude = ('slug',)
    list_display = ('name','square','guest_quantity','base_price_per_night','hotel_id')
    list_display_links = ('name',)
    search_fields = ('name','hotel_type_id')
    list_per_page = 25
    
admin.site.site_header = "ORENBE Administration System"
admin.site.register(HotelType, HotelTypeAdmin)
admin.site.register(Hotel, HotelAdmin)
admin.site.register(HotelImage)
admin.site.register(Room, RoomAdmin)
admin.site.register(RoomImage)
admin.site.register(HotelAddress)
admin.site.register(HotelAmenity)
admin.site.register(RoomAmenity)
admin.site.register(HotelAmenityAssociation)
admin.site.register(RoomAmenityAssociation)
admin.site.register(Booking)
admin.site.register(Comment)
admin.site.register(SavedHotel)
admin.site.register(HotelOwner)
