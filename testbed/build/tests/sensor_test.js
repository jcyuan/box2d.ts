/*
* Copyright (c) 2006-2012 Erin Catto http://www.box2d.org
*
* This software is provided 'as-is', without any express or implied
* warranty.  In no event will the authors be held liable for any damages
* arising from the use of this software.
* Permission is granted to anyone to use this software for any purpose,
* including commercial applications, and to alter it and redistribute it
* freely, subject to the following restrictions:
* 1. The origin of this software must not be misrepresented; you must not
* claim that you wrote the original software. If you use this software
* in a product, an acknowledgment in the product documentation would be
* appreciated but is not required.
* 2. Altered source versions must be plainly marked as such, and must not be
* misrepresented as being the original software.
* 3. This notice may not be removed or altered from any source distribution.
*/
System.register(["@box2d", "../testbed.js"], function (exports_1, context_1) {
    "use strict";
    var b2, testbed, SensorTest;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (b2_1) {
                b2 = b2_1;
            },
            function (testbed_1) {
                testbed = testbed_1;
            }
        ],
        execute: function () {
            SensorTest = class SensorTest extends testbed.Test {
                constructor() {
                    super();
                    this.m_bodies = new Array(SensorTest.e_count);
                    this.m_touching = new Array(SensorTest.e_count);
                    for (let i = 0; i < SensorTest.e_count; ++i) {
                        this.m_touching[i] = new Array(1);
                    }
                    const bd = new b2.BodyDef();
                    const ground = this.m_world.CreateBody(bd);
                    {
                        const shape = new b2.EdgeShape();
                        shape.SetTwoSided(new b2.Vec2(-40.0, 0.0), new b2.Vec2(40.0, 0.0));
                        ground.CreateFixture(shape, 0.0);
                    }
                    /*
                    {
                      const sd = new b2.FixtureDef();
                      sd.SetAsBox(10.0, 2.0, new b2.Vec2(0.0, 20.0), 0.0);
                      sd.isSensor = true;
                      this.m_sensor = ground.CreateFixture(sd);
                    }
                    */
                    {
                        const shape = new b2.CircleShape();
                        shape.m_radius = 5.0;
                        shape.m_p.Set(0.0, 10.0);
                        const fd = new b2.FixtureDef();
                        fd.shape = shape;
                        fd.isSensor = true;
                        this.m_sensor = ground.CreateFixture(fd);
                    }
                    {
                        const shape = new b2.CircleShape();
                        shape.m_radius = 1.0;
                        for (let i = 0; i < SensorTest.e_count; ++i) {
                            //const bd = new b2.BodyDef();
                            bd.type = b2.BodyType.b2_dynamicBody;
                            bd.position.Set(-10.0 + 3.0 * i, 20.0);
                            bd.userData = this.m_touching[i];
                            this.m_touching[i][0] = false;
                            this.m_bodies[i] = this.m_world.CreateBody(bd);
                            this.m_bodies[i].CreateFixture(shape, 1.0);
                        }
                    }
                }
                BeginContact(contact) {
                    const fixtureA = contact.GetFixtureA();
                    const fixtureB = contact.GetFixtureB();
                    if (fixtureA === this.m_sensor) {
                        const userData = fixtureB.GetBody().GetUserData();
                        if (userData) {
                            const touching = userData;
                            touching[0] = true;
                        }
                    }
                    if (fixtureB === this.m_sensor) {
                        const userData = fixtureA.GetBody().GetUserData();
                        if (userData) {
                            const touching = userData;
                            touching[0] = true;
                        }
                    }
                }
                EndContact(contact) {
                    const fixtureA = contact.GetFixtureA();
                    const fixtureB = contact.GetFixtureB();
                    if (fixtureA === this.m_sensor) {
                        const userData = fixtureB.GetBody().GetUserData();
                        if (userData) {
                            const touching = userData;
                            touching[0] = false;
                        }
                    }
                    if (fixtureB === this.m_sensor) {
                        const userData = fixtureA.GetBody().GetUserData();
                        if (userData) {
                            const touching = userData;
                            touching[0] = false;
                        }
                    }
                }
                Step(settings) {
                    super.Step(settings);
                    // Traverse the contact results. Apply a force on shapes
                    // that overlap the sensor.
                    for (let i = 0; i < SensorTest.e_count; ++i) {
                        if (!this.m_touching[i][0]) {
                            continue;
                        }
                        const body = this.m_bodies[i];
                        const ground = this.m_sensor.GetBody();
                        const circle = this.m_sensor.GetShape();
                        const center = ground.GetWorldPoint(circle.m_p, new b2.Vec2());
                        const position = body.GetPosition();
                        const d = b2.Vec2.SubVV(center, position, new b2.Vec2());
                        if (d.LengthSquared() < b2.epsilon_sq) {
                            continue;
                        }
                        d.Normalize();
                        const F = b2.Vec2.MulSV(100.0, d, new b2.Vec2());
                        body.ApplyForce(F, position);
                    }
                }
                static Create() {
                    return new SensorTest();
                }
            };
            exports_1("SensorTest", SensorTest);
            SensorTest.e_count = 7;
        }
    };
});
//# sourceMappingURL=sensor_test.js.map