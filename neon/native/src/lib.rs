#[macro_use]
extern crate neon;

extern crate url;

use url::{Url};
use neon::vm::{Call, JsResult};
use neon::js::{JsString};

fn get_query(call: Call) -> JsResult<JsString> {
    let scope = call.scope;
    let url = call.arguments.require(scope, 0)?.check::<JsString>()?.value();

    let parsed_url = Url::parse(
        &url
    ).unwrap();

    Ok(JsString::new(scope, parsed_url.query().unwrap()).unwrap())
}

register_module!(m, {
    m.export("getQuery", get_query)
});
