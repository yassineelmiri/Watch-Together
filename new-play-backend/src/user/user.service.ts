import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>, // Injection du modèle User
  ) {}

  // Créer un utilisateur
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto); // Crée un nouvel utilisateur avec les données du DTO
    return createdUser.save(); // Sauvegarde l'utilisateur dans la base de données
  }

  // Récupérer tous les utilisateurs
  async findAll(): Promise<User[]> {
    try {
      // Récupère toutes les vidéos de la base de données
      const videos = await this.userModel.find().exec();
      return videos;
    } catch (error) {
      console.error('Error fetching videos from the database:', error);
      throw new Error(`Error fetching videos from the database: ${error.message}`);
    }  }

  // Récupérer un utilisateur par son ID
  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec(); // Récupère un utilisateur par son ID
  }

  // Mettre à jour un utilisateur
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec(); // Met à jour l'utilisateur et retourne le nouvel utilisateur
  }

  // Supprimer un utilisateur
  async remove(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec(); // Supprime un utilisateur par son ID
  }
}
