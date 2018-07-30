$(function () {

    function log(message) {
        $("#response").text(message);
        $('pre span').each(function (i, block) {
            hljs.highlightBlock(block);
        });
    }

    $("#sendSms").click(() => {
        let to = $("#phone").val();
        if ( !to) {
            log(JSON.stringify({ error: "Enter a phone number" }, null, 2));
            return;
        }

        log("Sending SMS...");

        $.ajax({
            method: "POST",
            url: "/sms/send",
            data: {
                to,
                message: "Im a lumberjack, I sleep all day and I code all night"
            },
        })
        .done(function (msg) {
            console.log("message : ", msg);
            log(JSON.stringify(msg));
        })
        .fail(function (jqXHR, textStatus) {
            console.log("jqXHR", jqXHR);
            log(textStatus);
        });

    });

    $("#airtime").click(function () {
        const to = $("#phone").val();
        const amount = $("#amount").val();
        if (!to) {
            log(JSON.stringify({ error: "Enter a phone number" }, null, 2));
            return;
        }

        if (!amount) {
            log(JSON.stringify({ error: "Enter an amount (with currency) e,g, KES 334" }, null, 2));
            return;
        }

        log("Sending airtime.....");


        $.ajax({
            method: "POST",
            url: "/airtime/send",
            data: {
                to,
                amount
            }
        })
        .done(function (msg) {
            log(JSON.stringify(msg));
        })
        .fail(function (jqXHR, textStatus) {
            log(textStatus);
        });

    });

    $("#mobileCheckout").click(function () {
        const phoneNumber = $("#phone").val();
        const inputAmount = $("#amount").val();
        const productName = $("#product_name").val();

        if (!phoneNumber) {
            log(JSON.stringify({ error: "Enter a phone number" }, null, 2));
            return;
        }

        if (!inputAmount) {
            log(JSON.stringify({ error: "Enter an amount (with currency) e,g, KES 334" }, null, 2));
            return;
        }
        if (!productName) {
            log(JSON.stringify({ error: "Enter the name of the product registered with AT, eg. Braids" }, null, 2));
            return;
        }

        let currencyCode, amount;
        [currencyCode, amount] = inputAmount.split(" ");

        log("Sending...");

        $.ajax({
            method: "POST",
            url: "/payments/mobile-checkout",
            data: {
                phoneNumber,
                currencyCode,
                amount,
                productName
            }
        })
        .done(function (msg) {
            log(JSON.stringify(msg));
        })
        .fail(function (jqXHR, textStatus) {
            log(textStatus);
        });

    });

    $("#mobileB2C").click(function () {
        const phoneNumber = $("#phone").val();
        const InputAmount = $("#amount").val();
        const productName = $("#product_name").val();
        const name = $("#name").val();
        if (!phoneNumber) {
            log(JSON.stringify({ error: "Enter a phone number" }, null, 2));
            return;
        }

        if (!InputAmount) {
            log(JSON.stringify({ error: "Enter an amount (with currency) e,g, KES 334" }, null, 2));
            return;
        }
        if (!productName) {
            log(JSON.stringify({ error: "Enter the name of the product registered with AT, eg. Braids" }, null, 2));
            return;
        }
        if (!name) {
            log(JSON.stringify({ error: "Enter the name of the recipient" }, null, 2));
            return;
        }

        let currencyCode, amount;
        [currencyCode, amount] = InputAmount.split(" ");

        log("Sending money...");

        $.ajax({
            method: "POST",
            url: "/payments/mobile-b2c",
            data: {
                phoneNumber,
                amount,
                productName,
                name
            }
        })
        .done(function (msg) {
            log(JSON.stringify(msg));
        })
        .fail(function (jqXHR, textStatus) {
            log(textStatus);
        });

    });

});
