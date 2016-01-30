//
//  GLLoginViewController.m
//  GrocoLoco
//
//  Created by Mark Hall on 2015-09-30.
//  Copyright © 2015 Mark Hall. All rights reserved.
//

#import "GLLoginViewController.h"

@interface GLLoginViewController () <UIAlertViewDelegate>

@property (weak, nonatomic) IBOutlet UITextField *nameField;
@property (weak, nonatomic) IBOutlet UITextField *emailField;
@property (weak, nonatomic) IBOutlet UITextField *passwordField;
@property (weak, nonatomic) IBOutlet UIStackView *fieldStackView;
@property (weak, nonatomic) IBOutlet UIButton *submitButton;
@property (weak, nonatomic) IBOutlet UIView *loginView;
@property (weak, nonatomic) IBOutlet UIButton *switchLoginButton;
@property (weak, nonatomic) IBOutlet UIButton *switchSignUpButton;

@end

@implementation GLLoginViewController

#pragma mark -
#pragma mark View Lifecycle

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    self.navigationController.navigationBarHidden = YES;
}

- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
    [GLNetworkingManager isUserLoggedInCompletion:^(NSDictionary *response, NSError *error) {
        if (!error) {
            if (response[@"status"] == nil) {
                [[GLUserManager sharedManager] setPropertiesWithDict:response];
                [self performSegueWithIdentifier:GL_SHOW_HOME sender:self];
            }
            else {
                [self showError:@"User not logged in"];
            }
        }
        else {
            [self showError:error.description];
        }
    }];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    [self.fieldStackView removeArrangedSubview:self.nameField];
    [self.submitButton setTitle:@"Login" forState:UIControlStateNormal];

    self.loginView.layer.cornerRadius = 5;
    self.loginView.layer.masksToBounds = YES;

    self.submitButton.layer.cornerRadius = 5;
    // Do any additional setup after loading the view.
}

#pragma mark -
#pragma mark Button Methods

- (IBAction)switchToLogin:(id)sender
{
    if ([self.submitButton.titleLabel.text isEqualToString:@"Login"]) {
        return;
    }
    self.switchLoginButton.backgroundColor = [UIColor GLdarkGreen];
    [self.switchLoginButton setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
    self.switchSignUpButton.backgroundColor = UIColorFromRGB(0x3C5A17);
    [self.switchSignUpButton setTitleColor:[UIColor lightGrayColor] forState:UIControlStateNormal];
    [self.fieldStackView removeArrangedSubview:self.nameField];
    [self.submitButton setTitle:@"Login" forState:UIControlStateNormal];
}
- (IBAction)switchToSignUp:(id)sender
{
    if ([self.submitButton.titleLabel.text isEqualToString:@"Sign Up"]) {
        return;
    }
    self.switchSignUpButton.backgroundColor = [UIColor GLdarkGreen];
    [self.switchSignUpButton setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
    self.switchLoginButton.backgroundColor = UIColorFromRGB(0x3C5A17);
    [self.switchLoginButton setTitleColor:[UIColor lightGrayColor] forState:UIControlStateNormal];
    [self.fieldStackView insertArrangedSubview:self.nameField atIndex:0];
    [self.submitButton setTitle:@"Sign Up" forState:UIControlStateNormal];
}

- (IBAction)loginPressed:(UIButton *)sender
{
    [self showFullScreenHUD];
    if ([sender.titleLabel.text isEqualToString:@"Login"]) {
        [GLNetworkingManager loginUserWithEmail:self.emailField.text
                                       Password:self.passwordField.text
                                     completion:^(NSDictionary *response, NSError *error) {
                                         [self hideFullScreenHUD];
                                         if (!error) {
                                             [[GLUserManager sharedManager] setPropertiesWithDict:response];
                                             [self performSegueWithIdentifier:GL_SHOW_HOME sender:self];
                                         }
                                         else {
                                             [self showError:error.description];
                                         }
                                     }];
    }
    else {
        [GLNetworkingManager createNewUserWithName:self.nameField.text
                                          Password:self.passwordField.text
                                             Email:self.emailField.text
                                        completion:^(NSDictionary *response, NSError *error) {
                                            [self hideFullScreenHUD];
                                            if (!error) {
                                                [[GLUserManager sharedManager] setPropertiesWithDict:response];
                                                [self performSegueWithIdentifier:GL_SHOW_MAP_LOGIN sender:self];
                                            }
                                            else {
                                                [self showError:error.description];
                                            }
                                        }];
    }
}

- (IBAction) prepareForUnwind:(UIStoryboardSegue *)segue {
    [GLNetworkingManager logoutUserCompletion:^(NSDictionary *response, NSError *error) {
        if (!error) {
            NSLog(@"Logout Successful");
        }
        else {
            [self showError:error.description];
        }
    }];
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
