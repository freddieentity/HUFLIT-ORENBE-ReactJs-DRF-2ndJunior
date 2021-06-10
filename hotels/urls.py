from django.urls import path
from .views import ReportView, CommentsView, HotelTypesView, HotelsView, HotelImagesView, HotelView, PartnerHotelsView, ReportView, RoomBookingsView, RoomView, RoomsView, RoomImagesView, HotelAddressesView, RoomAmenitiesView, HotelAmenitiesView, RoomsHotelAssociation, HotelSearch, BookingsView, UserBookingsView, PartnerBookingsView, SavedHotelsView

urlpatterns = [
    path('hoteltypes/', HotelTypesView.as_view()),
    path('', HotelsView.as_view()),
    path('<slug>', HotelView.as_view()),
    path('hotelimages/', HotelImagesView.as_view()),
    path('rooms/', RoomsView.as_view()),
    path('rooms/<slug>', RoomView.as_view()),
    path('roomlist/', RoomsHotelAssociation.as_view()),
    path('roomimages/', RoomImagesView.as_view()),
    path('addresses/', HotelAddressesView.as_view()),
    path('roomamenities/', RoomAmenitiesView.as_view()),
    path('amenities/', HotelAmenitiesView.as_view()),
    path('search/', HotelSearch.as_view()),
    path('booking/', BookingsView.as_view()),
    path('guestbooking/', UserBookingsView.as_view()),
    path('partnerbooking/', PartnerBookingsView.as_view()),
    path('roombooking/', RoomBookingsView.as_view()),
    path('savedhotels/', SavedHotelsView.as_view()),
    path('comments/', CommentsView.as_view()),
    path('partnerhotels/', PartnerHotelsView.as_view()),
    path('report/', ReportView.as_view()),
]