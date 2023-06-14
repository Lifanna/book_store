# Generated by Django 3.2.19 on 2023-06-14 14:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_auto_20230614_0918'),
    ]

    operations = [
        migrations.CreateModel(
            name='CardType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Название')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Дата обновления')),
            ],
            options={
                'verbose_name': 'Заказ',
                'verbose_name_plural': 'Заказы',
            },
        ),
        migrations.AlterField(
            model_name='purchase',
            name='card_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.cardtype', verbose_name='Тип карты'),
        ),
    ]