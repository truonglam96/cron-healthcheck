// Copyright IBM Corp. and LoopBack contributors 2020. All Rights Reserved.
// Node module: @loopback/example-todo-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { authenticate, TokenService } from "@loopback/authentication";
import {
  Credentials,
  MyUserService,
  TokenServiceBindings,
  User,
  UserRepository,
  UserServiceBindings,
} from "@loopback/authentication-jwt";
import { inject } from "@loopback/core";
import { model, property, repository } from "@loopback/repository";
import {
  get,
  getModelSchemaRef,
  post,
  requestBody,
  SchemaObject,
} from "@loopback/rest";
import { SecurityBindings, securityId, UserProfile } from "@loopback/security";
import { genSalt, hash } from "bcryptjs";
import _ from "lodash";
import { ObjectId } from "mongodb";

@model()
export class NewUserRequest extends User {
  @property({
    type: "string",
    required: true,
  })
  password: string;
}

const CredentialsSchema: SchemaObject = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
      minLength: 1,
    },
  },
};

export const CredentialsRequestBody = {
  description: "The input of login function",
  required: true,
  content: {
    "application/json": { schema: CredentialsSchema },
  },
};

export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, { optional: true })
    public user: UserProfile,
    @repository(UserRepository) protected userRepository: UserRepository
  ) {}

  @post("/users/login", {
    responses: {
      "200": {
        description: "Token",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                token: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials
  ): Promise<any> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);
    if (!user.emailVerified) {
      return {
        error: "You need to verify your email before logging!",
      };
    }
    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);
    return { 
      status: 'OK',
      token: token 
    };
  }

  @authenticate("jwt")
  @get("/whoAmI", {
    responses: {
      "200": {
        description: "Return current user",
        content: {
          "application/json": {
            schema: {
              type: "string",
            },
          },
        },
      },
    },
  })
  async whoAmI(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile
  ): Promise<string> {
    return currentUserProfile[securityId];
  }

  @post("/signup", {
    responses: {
      "200": {
        description: "User",
        content: {
          "application/json": {
            schema: {
              "x-ts-type": User,
            },
          },
        },
      },
    },
  })
  async signUp(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(NewUserRequest, {
            title: "NewUser",
            exclude: ['id'],
          }),
        },
      },
    })
    newUserRequest: NewUserRequest
  ): Promise<User> {
    newUserRequest.emailVerified = false;
    
    const password = await hash(newUserRequest.password, await genSalt());
    const savedUser = await this.userRepository.create(
      _.omit(newUserRequest, "password")
    );

    await this.userRepository
      .userCredentials(savedUser.id)
      .create({ password });

    return savedUser;
  }

  // @get('/test', {
  //   responses: {
  //     '200': {
  //       description: 'Return current user',
  //       content: {
  //         'application/json': {
  //           schema: {
  //             type: 'string',
  //           },
  //         },
  //       },
  //     },
  //   },
  // })
  // async test(
  // ): Promise<any> {

  //   const nodemailer = require('nodemailer');
  //   const { google } = require('googleapis');
  //   const OAuth2 = google.auth.OAuth2;

  //   const oauth2Client = new OAuth2(
  //     'YOUR_CLIENT_ID',
  //     'YOUR_CLIENT_SECRET',
  //     'https://developers.google.com/oauthplayground'
  //   );

  //   oauth2Client.setCredentials({
  //     refresh_token: 'YOUR_REFRESH_TOKEN'
  //   });

  //   const transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //       type: 'OAuth2',
  //       user: 'YOUR_EMAIL_ADDRESS',
  //       clientId: 'YOUR_CLIENT_ID',
  //       clientSecret: 'YOUR_CLIENT_SECRET',
  //       refreshToken: 'YOUR_REFRESH_TOKEN',
  //       accessToken: oauth2Client.getAccessToken()
  //     }
  //   });

  //   const mailOptions = {
  //     from: 'YOUR_EMAIL_ADDRESS',
  //     to: 'RECIPIENT_EMAIL_ADDRESS',
  //     subject: 'Test Email with OAuth2',
  //     text: 'This is a test email sent from Node.js with OAuth2 authentication.'
  //   };

  //   transporter.sendMail(mailOptions, (error: any, response: any) => {
  //     if (error) {
  //       console.error(error);
  //     } else {
  //       console.log(`Email sent to ${response.envelope.to[0]}: ${response.response}`);
  //     }
  //     transporter.close();
  //   });

  //   // const crypto = require('crypto');

  //   // const generateOTP = () => {
  //   //   const otp = crypto.randomInt(100000, 999999); // Generate a 6 digit OTP code
  //   //   return otp;
  //   // }

  //   // const nodemailer = require('nodemailer');

  //   // const sendMail = async (email: string, otp: string) => {
  //   //   const transporter = nodemailer.createTransport({
  //   //     service: 'Gmail',
  //   //     auth: {
  //   //         type: 'OAuth2',
  //   //         user: 'mail',
  //   //         clientId: '387845914304-3kf83v8l7d0d5uo1ictspldeotnr7nk2.apps.googleusercontent.com',
  //   //         clientSecret: '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',
  //   //         refreshToken: '1//04-t4rLLHHlsyCgYIARAAGAQSNwF-L9Iro-8ceAXKqA9cnAozRQwcGVEmT22So2ZLoeDB_qhYR8cdH89cCOaPbL6tI3alymWT0kA',
  //   //         accessToken: 'Bearer ya29.a0AVvZVsp-juny8WNN3rDC3k09-zO8zZO3zH8gOwYBSojsdnFENSEMwnT-iizBtm4O6LFZPJi1gTGQF5GL2tNo7JueGiVlxSffphL1k8qVGg8_7nRU73HEemQ3s28nGt3ZID_kgDWuV1S-v0-WHWmuAQxYyxld4iQaCgYKAeISARESFQGbdwaIzNK7yozMG0-Nib5fWjVuLg0166',
  //   //         expires: 12345
  //   //   }
  //   // });

  //   //   const mailOptions = {
  //   //     from: 'lam.nguyen@wecheer.io',
  //   //     to: email,
  //   //     subject: 'OTP Verification',
  //   //     text: `Your OTP code is ${otp}.`
  //   //   };

  //   //   const info = await transporter.sendMail(mailOptions);
  //   //   console.log(`Email sent: ${info.messageId}`);
  //   // }

  //   // let otp = await generateOTP();

  //   // let send = await sendMail('lam.nguyen@wecheer.io', otp.toString());

  //   // const verifyOTP = (userOTP: string, generatedOTP: string) => {
  //   //   if (userOTP === generatedOTP) {
  //   //     console.log('OTP verified successfully.');
  //   //     return true;
  //   //   } else {
  //   //     console.log('Incorrect OTP.');
  //   //     return false;
  //   //   }
  //   // }
  // }
}
