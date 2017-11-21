extern crate libc;
extern crate url;

use std::ffi::{CStr,CString};
use url::{Url};

#[no_mangle]
pub extern "C" fn get_query (arg1: *const libc::c_char) -> *const libc::c_char {

    let s1 = unsafe { CStr::from_ptr(arg1) };

    let str1 = s1.to_str().unwrap();

    let parsed_url = Url::parse(
        str1
    ).unwrap();

    CString::new(parsed_url.query().unwrap().as_bytes()).unwrap().into_raw()
}
