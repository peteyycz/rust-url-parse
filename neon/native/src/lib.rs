#[macro_use]
extern crate neon;

extern crate url;

use url::Url;
use neon::vm::{Call, JsResult, Throw};
use neon::js::JsString;

enum UrlError {
    Parse(url::ParseError),
    Throw(Throw)
}

fn get_query(call: Call) -> JsResult<JsString> {
    let scope = call.scope;
    let url = call.arguments
        .require(scope, 0)?
        .check::<JsString>()?
        .value();

    Url::parse(&url)
        .map_err(UrlError::Parse)
        .and_then(|parsed_url| {
            parsed_url.query()
                .and_then(|query| JsString::new(scope, query))
                .ok_or(UrlError::Throw(Throw))
        })
        .or(Err(Throw))
}

register_module!(m, {
    m.export("getQuery", get_query)
});
