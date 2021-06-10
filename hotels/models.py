from django.core.checks.messages import Error
from django.core.exceptions import ValidationError
from accounts.models import UserAccount # type: ignore
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from datetime import date, datetime
from django.template.defaultfilters import slugify

class HotelAmenityCategory(models.TextChoices):
    HOTEL_SERVICES = "Hotel Services"
    FOOD_AND_DRINKS = "Food and Drinks"
    THINGS_TO_DO = "Things to Do"
    PUBLIC_FACILITIES = "Public Facilities"
    IN_ROOM_FACILITIES = "In-room Facilities"
    GENERAL = "General"
    SPORTS_AND_RECREATIONS = "Sports and Recreations"
    TRANSPORTATION = "Transportation"
    NEARBY_FACILITIES = "Nearby Facilities"
    BUSINESS_FACILITIES = "Business Facilities"
    FAMILY_FRIENDLY_FACILITIES = "Family-friendly Facilities"
    CONNECTIVITY = "Connectivity"
    SHUTTLE_SERVICES = "Shuttle Services"
    OTHERS = "Others"

class RoomCategory(models.TextChoices):
    FACILITIES = "Facilities"
    AMENITIES = "Amenities"
    OTHERS = "Others"


class HotelType(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Hotel(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField()
    sub_name = models.CharField(max_length=50, null=True)
    rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)], null=True)
    is_online_checked_in = models.BooleanField(default=False)
    base_price_per_night = models.DecimalField(max_digits=10, decimal_places=2, default=1)
    description = models.CharField(max_length=250, null=True)
    policy = models.CharField(max_length=50, null=True)
    business_license = models.CharField(max_length=14, null=True)
    main_photo = models.ImageField(upload_to='hotel/main/')
    hotel_type_id = models.ForeignKey(HotelType, on_delete=models.CASCADE, null=True)
    is_approved = models.BooleanField(default=False)
    is_available = models.BooleanField(default=True)

    def save(self, *args, **kwargs):  # override lại method save để khi gọi nó gán slug
        print(f"####54 {self.id}")
        original_slug = slugify(self.name)
        queryset = Hotel.objects.all().filter(slug__iexact=original_slug).count()

        count = 1
        slug = original_slug

        while queryset:  # cứ tìm queryset tới khi nào có slug
            slug = original_slug + '-' + str(count)
            count += 1
            queryset = Hotel.objects.all().filter(slug__iexact=slug).count()

        self.slug = slug  # tìm đc slug phù hợp thì gán vào lại class

        super(Hotel, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

def hotel_photo_upload_path(instance, filename):
    return f"hotel/{instance.hotel_id.slug}/{filename}"


class HotelImage(models.Model):
    hotel_id = models.ForeignKey(Hotel, on_delete=models.CASCADE, null=True)
    image = models.ImageField(upload_to=hotel_photo_upload_path)

    def __str__(self):
        return self.hotel_id.name


class Room(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField()
    square = models.FloatField(null=True)
    guest_quantity = models.PositiveSmallIntegerField(default=1, null=True)
    main_photo = models.ImageField(upload_to='room/main/')
    rating = models.FloatField(null=True, default=0)
    base_price_per_night = models.DecimalField(max_digits=10, decimal_places=2, default=1)
    hotel_id = models.ForeignKey(Hotel, on_delete=models.RESTRICT, null=True)
    is_available = models.BooleanField(default=True)

    def save(self, *args, **kwargs):  # override lại method save để khi gọi nó gán slug
        original_slug = slugify(self.name)
        queryset = Room.objects.all().filter(slug__iexact=original_slug).count()

        count = 1
        slug = original_slug

        while queryset:  # cứ tìm queryset tới khi nào có slug
            slug = original_slug + '-' + str(count)
            count += 1
            queryset = Room.objects.all().filter(slug__iexact=slug).count()

        self.slug = slug  # tìm đc slug phù hợp thì gán vào lại class

        super(Room, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


def room_photo_upload_path(instance, filename):
    return f"room/{instance.room_id.slug}/{filename}"


class RoomImage(models.Model):
    room_id = models.ForeignKey(Room, on_delete=models.CASCADE, null=True)
    image = models.ImageField(upload_to=room_photo_upload_path)

    def __str__(self):
        return self.room_id.name


class HotelAmenity(models.Model):
    category = models.CharField(max_length=100, null=True, choices=HotelAmenityCategory.choices, default=HotelAmenityCategory.OTHERS)
    name = models.CharField(max_length=100, null=True)

    def __str__(self):
        return f"{self.category} - {self.name}"


class HotelAmenityAssociation(models.Model):
    hotel_id = models.ForeignKey(Hotel, on_delete=models.CASCADE, null=True)
    hotel_amenity_id = models.ForeignKey(HotelAmenity, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"{self.hotel_id.name} - {self.hotel_amenity_id.name}"


class RoomAmenity(models.Model):
    category = models.CharField(max_length=100, null=True, choices=RoomCategory.choices, default=RoomCategory.OTHERS)
    name = models.CharField(max_length=100, null=True)

    def __str__(self):
        return f"{self.category} - {self.name}"


class RoomAmenityAssociation(models.Model):
    room_id = models.ForeignKey(Room, on_delete=models.CASCADE, null=True)
    room_amenity_id = models.ForeignKey(RoomAmenity, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"{self.room_id.name} - {self.room_amenity_id.name}"


class HotelAddress(models.Model):
    full_address = models.CharField(max_length=400, null=True)
    street = models.CharField(max_length=50, null=True)
    ward = models.CharField(max_length=50, null=True)
    district = models.CharField(max_length=50, null=True)
    city = models.CharField(max_length=50, null=True)
    country = models.CharField(max_length=50, null=True)
    hotel_id = models.ForeignKey(Hotel, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.full_address


class Booking(models.Model):
    checkin = models.DateField()
    checkout = models.DateField()   
    guest_name = models.CharField(max_length=50, null=True)
    email = models.CharField(max_length=150, null=True)
    phone = models.CharField(max_length=15, null=True)
    room_id = models.ForeignKey(Room, on_delete=models.RESTRICT, null=True)
    hotel_id = models.ForeignKey(Hotel, on_delete=models.RESTRICT, null=True)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, null=True)
    number_of_guest = models.IntegerField(default=1, null=True)
    payment = models.DecimalField(max_digits=15, decimal_places=2, default=0, null=True)
    payment_at = models.DateTimeField(null=True)
    is_paid = models.BooleanField(default=False)
    is_cancel = models.BooleanField(default=False)
    at = models.DateTimeField(auto_now_add=True, editable=False)

    def __str__(self):
        return f"{self.room_id.name} | {self.checkin} - {self.checkout} | {self.guest_name}"


    def save(self, *args, **kwargs):
        if self.id == None:
            if self.checkin < date.today() or self.checkout < date.today():
                raise ValidationError("The date cannot be in the past!")
        
            elif self.checkin >= self.checkout:
                raise ValidationError("Check-out must be after the day of check-in")
            
        super(Booking, self).save(*args, **kwargs)       



class Comment(models.Model):
    booking_id = models.ForeignKey(Booking, on_delete=models.CASCADE, null=True)
    content = models.CharField(max_length=150, null=True)
    rate = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)], null=True, default=0)
    at = models.DateTimeField(auto_now_add=True, editable=False)
    

    def __str__(self):
        return f"{self.booking_id.user.email} commentted: '{self.content}'"

    
    def save(self, *args, **kwargs):
        try:
            if self.booking_id.is_paid != True:
                raise ValidationError("Unable to comment when you haven't totally paid for the hotel manager yet!")
            if self.booking_id.checkout > datetime.now().date():
                print(self.booking_id.checkout)
                raise ValidationError("Unable to comment when you haven't finished staying at that hotel yet!")
            
            else:
                super(Comment, self).save(*args, **kwargs) 

        except:  
            pass      

class SavedHotel(models.Model):
    hotel_id = models.ForeignKey(Hotel, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"{self.user.email} likes {self.hotel_id.name}"

    def save(self, *args, **kwargs):
        try: 
            instance = SavedHotel.objects.filter(user=self.user, hotel_id=self.hotel_id).exists()
            if instance == True:
                print('Already liked')
            
            else:
                super(SavedHotel, self).save(*args, **kwargs) 

        except:  
            pass      
             


class HotelOwner(models.Model):
    hotel_id = models.ForeignKey(Hotel, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"{self.user.email} owns {self.hotel_id.name}"

    
    def save(self, *args, **kwargs):
        if self.user.is_partner != True:
            raise ValidationError("Only a partnership account could own some specific hotels!")

        try:
            instance = HotelOwner.objects.filter(user=self.user, hotel_id=self.hotel_id).exists()
            if instance == True:
                print('One partner owns only one hotel!')
            
            else:
                super(HotelOwner, self).save(*args, **kwargs) 

        except:  
            pass      


    