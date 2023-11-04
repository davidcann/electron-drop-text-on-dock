#import <AppKit/AppKit.h>
#import <Foundation/Foundation.h>
#include <napi.h>
#import <objc/runtime.h>

Napi::ThreadSafeFunction tsfnDropped;
void (*callbackDropped)(Napi::Env env, Napi::Function jsCallback, NSString *value);

NSString *droppedText;

@implementation NSApplication (DropTextOnDock)

+ (void)load {
	[[NSOperationQueue mainQueue] addOperationWithBlock:^{
	  [NSApp setServicesProvider:[NSApplication sharedApplication]];
	}];
}

- (void)handleTextDropOnDock:(NSPasteboard *)pboard userData:(NSString *)userData error:(NSString **)error {
	droppedText = [[pboard stringForType:NSPasteboardTypeString] retain];
	tsfnDropped.BlockingCall(droppedText, callbackDropped);
}

@end

void setupDropCallback(const Napi::CallbackInfo &info) {
	Napi::Env env = info.Env();
	tsfnDropped = Napi::ThreadSafeFunction::New(env, info[0].As<Napi::Function>(), "Dropped", 0, 1);
	callbackDropped = [](Napi::Env env, Napi::Function jsCallback, NSString *value) {
		jsCallback.Call({Napi::String::New(env, [value UTF8String])});
		[droppedText release];
		droppedText = nil;
	};
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
	exports.Set(Napi::String::New(env, "onDropText"), Napi::Function::New(env, setupDropCallback));
	return exports;
};

NODE_API_MODULE(NativeExtension, Init);
