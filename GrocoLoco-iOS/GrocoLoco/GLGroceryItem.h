//
//  GLGroceryItem.h
//  GrocoLoco
//
//  Created by Mark Hall on 2015-10-01.
//  Copyright © 2015 Mark Hall. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface GLPromotion : NSObject

@property (nonatomic, strong) NSString *title;
@property (nonatomic, strong) NSString *type;
@property (nonatomic, assign) CGFloat discount;
@property (nonatomic, assign, getter=isStillValid) BOOL isStillValid;

- (instancetype)initWithDictionary:(NSDictionary *)dictionary;

@end

@interface GLGroceryItem : NSObject

@property (nonatomic, assign) NSInteger blockNumber;
@property (nonatomic, strong) NSString *face;
@property (nonatomic, strong) NSString *aisle;
@property (nonatomic, assign) NSInteger shelf;
@property (nonatomic, strong) NSString *itemDescription;
@property (nonatomic, assign) CGFloat location;
@property (nonatomic, assign) GLCategory category;
@property (nonatomic, strong) NSString *ID;
@property (nonatomic, strong) NSString *comments;
@property (nonatomic, strong) UIButton *navPin;
@property (nonatomic, assign) CGFloat price;
@property (nonatomic, assign) NSInteger storeID;
@property (nonatomic, strong) NSURL *iconLink;
@property (nonatomic, strong) UIImage *image;
@property (nonatomic, strong) GLPromotion *promotion;
@property (nonatomic, assign) BOOL isPromotion;

- (instancetype)initWithDictionary:(NSDictionary *)dictionary;
- (NSDictionary *)objectAsDictionary;

@end
