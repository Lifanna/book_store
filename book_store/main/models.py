from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
        )

        user.is_active = True

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user
    
    def change_password(self, user_id, password):
        user = CustomUser.objects.get(pk=user_id)
        user.set_password(password)
        user.save(using=self._db)

        return user


class CustomUser(AbstractUser):
    email = models.EmailField(
        verbose_name="Email",
        max_length=255,
        unique=True,
    )

    REQUIRED_FIELDS = []

    created_at = models.DateTimeField("Дата создания", auto_now_add=True)

    updated_at = models.DateTimeField("Дата обновления", auto_now=True)

    USERNAME_FIELD = "email"

    objects = CustomUserManager()

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"


class Genre(models.Model):
    name = models.CharField("Название жанра", max_length=255)

    image = models.ImageField("Изображение", upload_to="genre_images/", null=True)

    created_at = models.DateTimeField("Дата создания", auto_now_add=True)

    updated_at = models.DateTimeField("Дата обновления", auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Жанр"
        verbose_name_plural = "Жанры"


class Author(models.Model):
    first_name = models.CharField("Фамилия", max_length=255)

    last_name = models.CharField("Имя", max_length=255)

    created_at = models.DateTimeField("Дата создания", auto_now_add=True)

    updated_at = models.DateTimeField("Дата обновления", auto_now=True)

    class Meta:
        verbose_name = "Автор"
        verbose_name_plural = "Авторы"

    def __str__(self):
        return self.first_name + " " + self.last_name


class Book(models.Model):
    name = models.CharField("Название", max_length=255)

    description = models.TextField("Описание")

    price = models.PositiveIntegerField("Цена")

    genre = models.ForeignKey(Genre, on_delete=models.CASCADE, verbose_name="Жанр")

    authors = models.ManyToManyField(Author, verbose_name="Авторы")

    image = models.ImageField("Изображение", upload_to="images/", null=True)

    rating = models.FloatField("Рейтинг", null=True)

    created_at = models.DateTimeField("Дата создания", auto_now_add=True)

    updated_at = models.DateTimeField("Дата обновления", auto_now=True)

    class Meta:
        verbose_name = "Книга"
        verbose_name_plural = "Книги"
        
    def __str__(self):
        return self.name


class Order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="Пользователь (покупатель)")

    book = models.ForeignKey(Book, on_delete=models.CASCADE, verbose_name="Книга")

    quantity = models.PositiveBigIntegerField("Количество товара", null=True)

    totalPrice = models.PositiveBigIntegerField("Общая цена товара", null=True)

    is_done = models.BooleanField("Статус", default=False)

    created_at = models.DateTimeField("Дата создания", auto_now_add=True)

    updated_at = models.DateTimeField("Дата обновления", auto_now=True)

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"

    def __str__(self):
        return self.user.email + " " + self.book.name


class CardType(models.Model):
    name = models.CharField("Название", max_length=255)

    created_at = models.DateTimeField("Дата создания", auto_now_add=True)

    updated_at = models.DateTimeField("Дата обновления", auto_now=True)

    class Meta:
        verbose_name = "Тип карты"
        verbose_name_plural = "Типы карт"
        
    def __str__(self):
        return self.name


class Purchase(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="Пользователь (покупатель)")

    orders = models.JSONField("Заказы")

    card_number = models.CharField("Номер карты", max_length=16)

    card_type = models.ForeignKey(CardType, on_delete=models.CASCADE, verbose_name="Тип карты")

    card_expiration_date = models.CharField("Срок действия", max_length=16)

    delivery = models.CharField("Способ доставки", max_length=16)

    created_at = models.DateTimeField("Дата создания", auto_now_add=True)

    updated_at = models.DateTimeField("Дата обновления", auto_now=True)

    class Meta:
        verbose_name = "Покупка"
        verbose_name_plural = "Покупки"

    def __str__(self):
        return self.user.email + str(self.orders)


class BookRating(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, verbose_name="Книга")

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="Пользователь")

    rating = models.FloatField("Оценка", null=True)

    created_at = models.DateTimeField("Дата создания", auto_now_add=True)

    updated_at = models.DateTimeField("Дата обновления", auto_now=True)

    class Meta:
        verbose_name = "Оценка"
        verbose_name_plural = "Оценки"

    def __str__(self):
        return self.book + " " + self.user
